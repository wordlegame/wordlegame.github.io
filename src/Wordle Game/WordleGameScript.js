
const NUMBER_OF_GUESSES = 6;
let guessesRemaining;
let currentGuess;
let currentLetter;

let wordAnswersArray = [];
let wordGuessesArray = [];
let correctWord;
let keyboardLetters = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];

let uniqueLetters = new Set();  // This will hold the unique letters
let guessCount = 0;  // This will count the guesses

const urlParams = new URLSearchParams(window.location.search);
const gamemode = urlParams.get('selectedOption');

const run = () => {
    const NUMBER_OF_GUESSES = 6;
    guessesRemaining = NUMBER_OF_GUESSES;
    currentGuess = [];
    currentLetter = 0;
    document.getElementById("modes");
    loadAllowedGuesses("../Wordle Text Files/" + gamemode + "guesses.txt");
    loadCorrectWord("../Wordle Text Files/" + gamemode + "answers.txt");
}

run();

function loadCorrectWord(fileURL) {
    fetch(fileURL).then(response => response.text()).then(fileContents => { //gets the contents of the file
        wordAnswersArray = fileContents.split('\n'); //creates an array from the specified text file
        for(let i = 0; i < wordAnswersArray.length; i++) {
            wordAnswersArray[i] = wordAnswersArray[i].substring(0, 5);
        }
        correctWord = wordAnswersArray[Math.floor(Math.random()*wordAnswersArray.length)]; //sets the correct word to a ranodm array element
    }).catch(error => {
        console.error('Error reading the file:', error);
    });
}

function loadAllowedGuesses(fileURL) {
    fetch(fileURL).then(response => response.text()).then(fileContents => { //gets the contents of the file
        wordGuessesArray = fileContents.split('\n'); //creates an array from the specified text file
        for(let i = 0; i < wordGuessesArray.length; i++) {
            wordGuessesArray[i] = wordGuessesArray[i].substring(0, 5);
        }
    }).catch(error => {
        console.error('Error reading the file:', error);
    });
}

document.addEventListener("keydown", (e) => {
    keyPress(String(e.key));
});

document.getElementById('keyboardDiv').addEventListener("click", (e) => {
    keyPress(e.target.id);
}); 

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

function submitWord() {
    let guess = "";
    for(let i = 0; i < currentGuess.length; i++) {
        guess += currentGuess[i];
        uniqueLetters.add(currentGuess[i]);  // Add the letter to the Set
    }
    guessCount++;  // Increment the guess count
    if(verifyWord(guess)) {//check that the word is on the word list
        if(checkAnswer(guess)) { //check if the word is the correct word
            setTimeout(() => alert("You Win!"), 3000);
            endGame(guessCount);
        }
    
        let colorArray = checkLetters(guess);//check which letters are correct and which aren't
        const lettersPromise = colorLetters(colorArray);
        const keyboardPromise = colorKeyboard(colorArray, guess);
        
        Promise.all([lettersPromise, keyboardPromise])
            .then(() => {
                guessesRemaining--;
                currentLetter = 0;
                currentGuess = [];
                if (guessesRemaining === 0) {
                    setTimeout(() => alert("You did not guess the correct word in 6 tries."), 2500);
                }
            });
    } else {
        alert("Please enter a valid word");
        currentLetter = 0;
        currentGuess = [];
        let currentRow = 6 - guessesRemaining;
        for(let i = 1; i < 6; i++) {
            document.getElementById("" + currentRow + i).innerHTML = "";
        }
    }
}

function checkAnswer(guess) {
    return guess === correctWord;
}

function verifyWord(guess) {
    return wordGuessesArray.includes(guess);
}

function checkLetters(guess) {
    let colorArray = ["gray", "gray", "gray", "gray", "gray"];
    let guessCharacters = [];
    let correctWordCharacters = [];
    guessCharacters = guess.split('');
    correctWordCharacters = correctWord.split('');
    let letterTaken = [false, false, false, false, false];

    for(let i = 0; i < 5; i++) {
        if(guessCharacters[i] === correctWordCharacters[i]) {
            colorArray[i] = "green";
            letterTaken[i] = true;
        }
    }

    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 5; j++) {
            if(guessCharacters[i] === correctWordCharacters[j] && !letterTaken[j] && colorArray[i] === "gray") {
                colorArray[i] = "yellow";
                letterTaken[j] = true;
            }
        }
    }
    return colorArray;
}

function colorLetters(colorArray) {
    return new Promise((resolve) => {
        let currentRow = 6 - guessesRemaining;
        document.getElementById(currentRow + "1").classList.add(colorArray[0]);
        setTimeout(() => {
            document.getElementById(currentRow + "2").classList.add(colorArray[1]);
            setTimeout(() => {
                document.getElementById(currentRow + "3").classList.add(colorArray[2]);
                setTimeout(() => {
                    document.getElementById(currentRow + "4").classList.add(colorArray[3]);
                    setTimeout(() => {
                        document.getElementById(currentRow + "5").classList.add(colorArray[4]);
                        resolve();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    });
}

function colorKeyboard(colorArray, guess) {
    for(let i = 0; i < 5; i++) {
        let letterIndex = parseInt(guess[i], 36) - 10;
        if((keyboardLetters[letterIndex] === "empty") || (keyboardLetters[letterIndex] === "gray" && (colorArray[i] === "yellow" || colorArray[i] === "green")) || (keyboardLetters[letterIndex] === "yellow" && (colorArray[i] === "green"))) {
            keyboardLetters[letterIndex] = colorArray[i];
        }
        
    }
    for(let i = 0; i < 5; i++) {
        if(keyboardLetters[parseInt(guess[i], 36) - 10] === 'yellow') {
            setTimeout(() => document.getElementById(guess[i]).style.color = "white", 4000);
            setTimeout(() => document.getElementById(guess[i]).style.backgroundColor = "#c8b653", 4000);
            setTimeout(() => document.getElementById(guess[i]).style.borderColor = "#c8b653", 4000);
        }
        if(keyboardLetters[parseInt(guess[i], 36) - 10] === 'green') {
            document.getElementById(guess[i]).classList.remove('yellowKey');
        }
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById(guess[0]).classList.add(keyboardLetters[parseInt(guess[0], 36) - 10] + "Key");
            setTimeout(() => {
                document.getElementById(guess[1]).classList.add(keyboardLetters[parseInt(guess[1], 36) - 10] + "Key");
                setTimeout(() => {
                    document.getElementById(guess[2]).classList.add(keyboardLetters[parseInt(guess[2], 36) - 10] + "Key");
                    setTimeout(() => {
                        document.getElementById(guess[3]).classList.add(keyboardLetters[parseInt(guess[3], 36) - 10] + "Key");
                        setTimeout(() => {
                            document.getElementById(guess[4]).classList.add(keyboardLetters[parseInt(guess[4], 36) - 10] + "Key");
                            resolve();
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    });
}

function endGame(guessCount) {

    // Join the unique letters together into a string, separated by commas
    const letters = Array.from(uniqueLetters).join(', ');

    // Create the game info object
    const gameInfo = {

        finalGuessCount: guessCount,

        letters: letters

    };

    // Load existing games from localStorage
    const gamesJSON = localStorage.getItem('games');
    let games;
    if (gamesJSON) {
        games = JSON.parse(gamesJSON);
    } else {
        games = {};
    }

    // Determine the next game number
    const gameNumber = Object.keys(games).length + 1;

    // Add new game info
    games[gameNumber] = gameInfo;

    // Save updated games back to localStorage
    localStorage.setItem('games', JSON.stringify(games));
}