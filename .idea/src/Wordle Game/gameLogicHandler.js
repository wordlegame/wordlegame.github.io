let guessesRemaining = 6;
let currentLetter = 0;
let currentGuess = [];
let wordGuessesArray = [];
let evilWordGuessesArray = [];
let guessedLetterList = [];
let correctWord;
let selectedmode;

function initializeGameLogicHandler(guessesArray, word, mode) {
    wordGuessesArray = guessesArray;
    correctWord = word;
    selectedmode = mode;
    evilWordGuessesArray = guessesArray;
}

function keyPress(e) {
    if (guessesRemaining === 0) {
        return
    }
    let pressedKey = e;
    if(pressedKey === "Backspace" && currentLetter > 0) {
        removeLetter();
    } else if(pressedKey === "Enter") {
        if(currentLetter === 5) {
            submitWord();
        } else {

        }
    } else if(isLetter(pressedKey) && currentLetter < 5) {
        addLetter(pressedKey);
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function addLetter(pressedKey) {
    let currentRow = 6 - guessesRemaining;
    let gridLetter = "" + currentRow + (currentLetter + 1);
    document.getElementById(gridLetter).innerHTML = pressedKey.toLocaleUpperCase();
    currentLetter++;
    currentGuess.push(pressedKey.toLocaleLowerCase());
}

function removeLetter() {
    let currentRow = 6 - guessesRemaining;
    let gridLetter = "" + currentRow + (currentLetter);
    document.getElementById(gridLetter).innerHTML = "";
    currentLetter--;
    currentGuess.pop();
}

async function submitWord() {
    let guess = "";
    for(let i = 0; i < currentGuess.length; i++) {
        guess += currentGuess[i];
    }
    if(verifyWord(guess)) {//check that the word is on the word list
        for(let i = 0; i < 5; i++) {
            if(!guessedLetterList.includes(currentGuess[i])) {
                guessedLetterList.push(currentGuess[i]);
            }
        }
        guessedLetterList.sort();
        if(selectedmode === "evil") {
            evilModeWordChange();
        }
        for(let i = 0; i < currentGuess.length; i++) {
            uniqueLetters.push(currentGuess[i]);  // Add the letter to the Set  //statistics code
        }
        guessCount++;  // Increment the guess count  //statistics code
        if(checkAnswer(guess)) { //check if the word is the correct word
            setTimeout(() => {
                endMenuOpen(true);
                showCorrectWord();
            }, 3700); // Open the end menu, pass true because the user won
            document.removeEventListener("keydown", window.keyPressHandler);
            document.getElementById('keyboardDiv').removeEventListener("click", window.keyPressHandler);
            document.getElementById("endMenuClose").onclick = endMenuClose;
            const time = stopTime();
            endGame(guessCount, true, time);  //statistics code
        }
    
        let colorArray = checkLetters(guess);//check which letters are correct and which aren't
        const lettersPromise = colorLetters(colorArray);
        const keyboardPromise = colorKeyboard(colorArray, guess);
        
        Promise.all([lettersPromise, keyboardPromise])
        guessesRemaining--;
        currentLetter = 0;
        currentGuess = [];
        if (guessesRemaining === 0 && !checkAnswer(guess)) {//Failed all 6 times
            setTimeout(() => {
                endMenuOpen(false);
                showCorrectWord();
            }, 3700); // Open the end menu, pass false because the user lost
            document.removeEventListener("keydown", window.keyPressHandler);
            document.getElementById("endMenuClose").onclick = endMenuClose;
            endGame(guessCount, false, -1);  //statistics code
            stopTime();
        }
        if (selectedmode === 'ai') {
            let newGuess = await aiModeArray(guess, colorArray); // Use await here
            return newGuess;
        }
    } else {
        let shakeLettersPromise = new Promise(function(resolve, reject) {
            for(let i = 1; i < 6; i++) {
                let cellNum = "" + (6 - guessesRemaining) + i;
                document.getElementById(cellNum).classList.add("hover");
            }
        }).then(
            setTimeout(() => {
                for(let i = 1; i < 6; i++) {
                    let cellNum = "" + (6 - guessesRemaining) + i;
                    document.getElementById(cellNum).classList.remove("hover");
                }
            }, 250)
        );
    }
}

function checkAnswer(guess) {
    return guess === correctWord;
}

function verifyWord(guess) {
    return wordGuessesArray.includes(guess);
}

function evilModeWordChange() {
    evilWordGuessesArray = evilWordGuessesArray.filter(word => {
        return !guessedLetterList.some(letter => word.includes(letter));
      });
    if(evilWordGuessesArray.length > 0) {
        correctWord = evilWordGuessesArray[Math.floor(Math.random() * evilWordGuessesArray.length)];
    } 
}

let excludeLetters = "";
let includeLetters = "";

async function aiModeArray(guess, colorArray) {
    // Ensure both arrays have the same length
    if (guess.length !== colorArray.length) {
        throw new Error('Both arrays must have the same length');
    }

    let contains = "";

    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const color = colorArray[i];

        switch (color) {
            case 'gray':
                // Add to excludeLetters if it's not already included, not marked yellow or green elsewhere
                if (!excludeLetters.includes(letter) && !includeLetters.includes(letter)) {
                    let isElsewhere = false;
                    for (let j = 0; j < guess.length; j++) {
                        if (i !== j && (colorArray[j] === 'yellow' || colorArray[j] === 'green') && guess[j] === letter) {
                            isElsewhere = true;
                            break;
                        }
                    }
                    if (!isElsewhere) {
                        excludeLetters += letter;
                    }
                }
                contains += "_";
                break;
            case 'yellow':
                // Only add to includeLetters if it's not already included
                if (!includeLetters.includes(letter)) {
                    includeLetters += letter;
                }
                contains += "_";
                break;
            case 'green':
                contains += letter;
                break;
            default:
                contains += "_";    
                break;
        }
    }

    try {
        // Await the async call to searchForWords to get the result before proceeding.
        let newGuess = await searchForWords(contains, excludeLetters, includeLetters);        
        // Return the newGuess
        return newGuess;
    } catch (error) {
        // If there's an error, log it and handle as appropriate
        console.error("There was an error getting the new guess:", error);
        throw error; // or handle another way
    }
}


function searchForWords(contains, excludeLetters, includeLetters) {
    const baseUrl = "https://fly.wordfinderapi.com/api/search";
    const length = 5;
    const wordSorting = "az";
    const groupByLength = true;
    const pageSize = 20;
    const dictionary = "wordle";

    const url = `${baseUrl}?contains=${contains}&exclude_letters=${excludeLetters}&include_letters=${includeLetters}&length=${length}&word_sorting=${wordSorting}&group_by_length=${groupByLength}&page_size=${pageSize}&dictionary=${dictionary}`;

    // Return the fetch promise
    return fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json, text/plain, */*",
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.word_pages && data.word_pages.length > 0 && data.word_pages[0].word_list.length > 0) {
            const newGuess = data.word_pages[0].word_list[0].word;
            return newGuess; 
        } else {
            return null; 
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        throw error; 
    });
}

/**
 * Shows the correct word in the end of game popup
 */
const showCorrectWord = () => {
    //Split correct word into an array of letters
    const letters = correctWord.split("");

    //Add letters to grid
    document.getElementById('l1').innerText = letters[0].toUpperCase();
    document.getElementById('l2').innerText = letters[1].toUpperCase();
    document.getElementById('l3').innerText = letters[2].toUpperCase();
    document.getElementById('l4').innerText = letters[3].toUpperCase();
    document.getElementById('l5').innerText = letters[4].toUpperCase();
}
