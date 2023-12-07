/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

let wordGuessesArray = [];  //the array of all allowed guesses
let correctWord;  //the current game correct word
const mode = new URLSearchParams(window.location.search).get('selectedOption');  //gets the selected gamemode
let gamemode = mode;
if(mode === 'classic' || mode === 'timed' || mode === 'hard' || mode === 'evil' || mode === 'ai' || mode === 'hint') {
    gamemode = 'classic';
}

if (mode === 'ai') {
    window.onload = async function onLoad() {
        correctWord = await loadCorrectWord("../Wordle Text Files/" + gamemode + "answers.txt");  //load the correct word
        wordGuessesArray = await loadAllowedGuesses("../Wordle Text Files/" + gamemode + "guesses.txt");  //load the guess array
        initializeGameLogicHandler(wordGuessesArray, correctWord, mode);  //sends the guess array and correct word variables to the gameLogicHandler
        
        // Button Functionality
        //Get session storage
        let storage = sessionStorage;

        //How to Play open button functionality
        let help_button = document.getElementById("helpMenu");
        help_button.onclick = openHelpForm;
    
        //How To Play close button functionality
        let close_button = document.getElementById("closeButton");
        close_button.onclick = closeHelpForm;

        //Hint button functionality 
        let hint_button = document.getElementById("hintButton");
        hint_button.onclick = openHintForm;

        //Hint close button functionality
        let hint_close_button = document.getElementById("closeHintButton");
        hint_close_button.onclick = closeHintForm;

        //Play again button functionality
        let play_again_button = document.getElementById("playAgain");
        play_again_button.onclick = playAgain;
        
        // Guess init word "adieu"
        for (let letter of ["a", "d", "i", "e", "u"]) {
            addLetter(letter);
        }
        let newGuess = await submitWord(mode);  
        let oldGuess = "";
        while (guessesRemaining > 0 && !checkAnswer(newGuess)) {
            await sleep(1000);
            if (newGuess === oldGuess) {
                break;
            }
            // Reset currentGuess for the next round of guesses
            currentGuess = [];
            if (newGuess) {
                let newGuessArray = newGuess.split("");
                for (let letter of newGuessArray) {
                    addLetter(letter);
                }
                oldGuess = newGuess;
                newGuess = await submitWord(mode);  // Use await here
            } else {
                // Handle case when newGuess is null or undefined
                break; // Exit loop if there is no new guess
            }
        }
        await sleep(1000);
        currentGuess = [];
        if (newGuess) {
            let newGuessArray = newGuess.split("");
            for (let letter of newGuessArray) {
                addLetter(letter);
            }   
            newGuess = await submitWord(mode);  
        }
        if (guessesRemaining === 0 && !checkAnswer(newGuess)) { //Failed all 6 times
            setTimeout(() => endMenuOpen(fals, mode), 3700); // Open the end menu, pass false because the user lost
            document.getElementById("endMenuClose").onclick = endMenuClose;
        } else if (checkAnswer(newGuess)){
            setTimeout(() => endMenuOpen(true, mode), 3700); // Open the end menu, pass true because the user won
            document.removeEventListener("keydown", window.keyPressHandler);
            document.getElementById('keyboardDiv').removeEventListener("click", window.keyPressHandler);
            document.getElementById("endMenuClose").onclick = endMenuClose;
        } else {
            // Handle case when newGuess is null or undefined
            setTimeout(() => endMenuOpen(fals, mode), 3700); // Open the end menu, pass false because the user lost
        }
    }
    //Open help form
    const openHelpForm = () => {
        document.getElementById("howToPlayContainer").style.display = "block";
    }

    //Close help form
    const closeHelpForm = () => {
        document.getElementById("howToPlayContainer").style.display = "none";
    }

    //Open hint form
    const openHintForm = () => {
        document.getElementById("hintContainer").style.display = "block";
        displayPossibleHints();
    }

    //Close hint form
    const closeHintForm = () => {
        document.getElementById("hintContainer").style.display = "none";
    }

    //Play again (reload the game)
    const playAgain = () => {
        window.location.href = `./wordleGame.html?selectedOption=${mode}`;
    }
} else {
    //Initializes the program when the window loads
    window.onload = async function onLoad() {
        //load wordleGameScript
        if (mode !== 'timed'){
            document.addEventListener("keydown", keyPressHandler);  //keypress detector
            document.getElementById("keyboardDiv").addEventListener("click", keyPressHandler);  //onscreen keyboard click detector
        }
        if(mode === 'hint') {
            document.getElementById("hintButton").style.display = "block";
        }
        correctWord = await loadCorrectWord("../Wordle Text Files/" + gamemode + "answers.txt");  //load the correct word
        wordGuessesArray = await loadAllowedGuesses("../Wordle Text Files/" + gamemode + "guesses.txt");  //load the guess array
        //load gameLogicHandler
        initializeGameLogicHandler(wordGuessesArray, correctWord, mode);  //sends the guess array and correct word variables to the gameLogicHandler

        //Get session storage
        let storage = sessionStorage;

        //How to Play open button functionality
        let help_button = document.getElementById("helpMenu");
        help_button.onclick = openHelpForm;
    
        //How To Play close button functionality
        let close_button = document.getElementById("closeButton");
        close_button.onclick = closeHelpForm;

        //Hint button functionality 
        let hint_button = document.getElementById("hintButton");
        hint_button.onclick = openHintForm;

        //Hint close button functionality
        let hint_close_button = document.getElementById("closeHintButton");
        hint_close_button.onclick = closeHintForm;

        //Play again button functionality
        let play_again_button = document.getElementById("playAgain");
        play_again_button.onclick = playAgain;

        //Set game styling to mode
        setGameStyle(storage.getItem("mode"));
    }

    //handles key presses and on screen keyboard use
    window.keyPressHandler = function(e) {
        if('key' in e) {
            keyPress(String(e.key));  //keypress
        } else {
            keyPress(e.target.id);  //keyboard click
        }
    }

    // Timed Mode 
    if (mode !== 'timed') {
        time();
    } else {
        document.getElementById("timerSelection").style.display = "block";
        let easy_button = document.getElementById("easy");
        easy_button.onclick = startEasyTimer;
        let medium_button = document.getElementById("medium");
        medium_button.onclick = startMediumTimer;
        let hard_button = document.getElementById("hard");
        hard_button.onclick = startHardTimer;
        let custom_button = document.getElementById("submit");
        custom_button.onclick = startCustomTimer;
    }

    //Open help form
    const openHelpForm = () => {
        document.getElementById("howToPlayContainer").style.display = "block";
    }

    //Close help form
    const closeHelpForm = () => {
        document.getElementById("howToPlayContainer").style.display = "none";
    }

    //Open hint form
    const openHintForm = () => {
        document.getElementById("hintContainer").style.display = "block";
        displayPossibleHints();
    }

    //Close hint form
    const closeHintForm = () => {
        document.getElementById("hintContainer").style.display = "none";
    }

    //Play again (reload the game)
    const playAgain = () => {
        window.location.href = `./wordleGame.html?selectedOption=${mode}`;
    }

    //handles key presses and on screen keyboard use
    window.keyPressHandler = function(e) {
        if('key' in e) {
            keyPress(String(e.key));  //keypress
        } else {
            keyPress(e.target.id);  //keyboard click
        }
    }

    //Clear game mode style
    const clearGameStyle = () => {
        //Clear elements appended to the top of the body
        document.getElementById("appendToTop").textContent = "";
        //Reset title text
        document.getElementById("title").innerText = "Wordle";
    }

    //Set the game mode style
    const setGameStyle = (gameMode) => {
        clearGameStyle();
        let style = document.getElementById("currentGameStylesheet");

        if (gameMode === "christmas" || gamemode === "halloween" || gamemode === "rocketleague" || gamemode === "thanksgiving") {
            style.innerHTML = `<link rel="game stylesheet" href="./CSS/${gameMode}.css"></link>`;
        }

        if (gameMode === "halloween") {
            toHalloween();
        } else if (gameMode === "christmas") {
            toChristmas();
        } else if (gameMode === "thanksgiving") {
            toThanksgiving();
        } else if (gameMode === "rocketleague") {
            document.getElementById("title").innerHTML = '<h1>Wordle <img src="https://cdn3.emoji.gg/emojis/3335_rocket_league_logo.png" width="40px" height="40px" alt="rocket_league_logo"></img></h1>';
        } else {
            style.innerHTML = "";
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}