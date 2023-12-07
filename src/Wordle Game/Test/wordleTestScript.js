/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

/*
Jest is unable to perform tests using the WordleGameScript.js file due to the 
use of URL Params and window, so this wordleTestScript.js file will replicate the 
functions in that file. If we make any changes to the Wordle game script, we will 
reflect those changes in this file.

To run the tests, use the Jest extension or type "npm run test" in the integrated terminal.
*/

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


const loadFiles = (gamemode) => {
    //Load word answers
    const fs = require('fs');
    fs.readFile('Wordle Text Files\\' + gamemode + 'answers.txt', 'utf-8', (err, words) => {
        if (err) {throw err};
        
        wordAnswersArray = words.split('\n');
        for(let i = 0; i < wordAnswersArray.length; i++) {
            wordAnswersArray[i] = wordAnswersArray[i].substring(0, 5);
        } 
    });

    //Load word guesses
    fs.readFile('Wordle Text Files\\' + gamemode + 'guesses.txt', 'utf-8', (err, words) => {
        if (err) {throw err};
        
        wordGuessesArray = words.split('\n');
        for(let i = 0; i < wordGuessesArray.length; i++) {
            wordGuessesArray[i] = wordGuessesArray[i].substring(0, 5);
        } 
    });
}

const loadCorrectWord = () => {
    return wordAnswersArray[Math.floor(Math.random()*wordAnswersArray.length)];
    //sets the correct word to a ranodm array element
}


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

module.exports = {loadFiles, loadCorrectWord, isLetter, wordAnswersArray, wordGuessesArray, correctWord};