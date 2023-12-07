/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

//imports functions and variables that will be used from the test script file
let { loadFiles, loadCorrectWord, isLetter, wordAnswersArray, wordGuessesArray, correctWord } = require('./wordleTestScript.js');


beforeAll(() => {
    //The string can be edited to test different game mode files
    loadFiles("classic");

});

describe('Load Text File Tests', () => {
    test('Check guesses for 5 lowercase letters', () => {
        let valid = true;
        const regex = new RegExp('[a-z]{5}');

        for (let i = 0; i < wordGuessesArray.length; i++) {
            valid = regex.test(wordGuessesArray[i]);
        }

        expect(valid).toBe(true);
    });

    test('Check answers for 5 lowercase letters', () => {
        let valid = true;
        const regex = new RegExp('[a-z]{5}');

        for (let i = 0; i < wordAnswersArray.length; i++) {
            valid = regex.test(wordAnswersArray[i]);
        }

        expect(valid).toBe(true);
    });
});

describe('Load Word Tests', () => {
    test('Checks that random word can get first and last indexes', () => {
        let sampleWords = [];
        let trials = 10_000;

        for(let i = 0; i < trials; i++) {
            sampleWords.push(loadCorrectWord());
        }

        let valid = true;
        if (!sampleWords.includes(wordAnswersArray[0] && !sampleWords.includes(wordAnswersArray[wordAnswersArray.length]))) {
            valid = false;
        }
        expect(valid).toBe(true);
    });

});

describe('Input Tests', () => {
    test('Checks that a string input is a letter', () => {
        expect(isLetter("Word")).toBe(false);
        expect(isLetter("lowercaseword")).toBe(false);
        expect(isLetter(" ")).toBe(false);
        expect(isLetter("   ")).toBe(false);
        expect(isLetter("")).toBe(false);
        expect(isLetter("@")).toBe(false);
        expect(isLetter("Aa")).toBe(false);
        expect(isLetter("aa")).toBe(false);
        expect(isLetter("1")).toBe(false);
        expect(isLetter("@")).toBe(false);
        expect(isLetter("123")).toBe(false);

        expect(isLetter("A")).toBe(true);
        expect(isLetter("d")).toBe(true); 
        expect(isLetter("B")).toBe(true); 
        expect(isLetter("L")).toBe(true); 
        expect(isLetter("s")).toBe(true); 
        expect(isLetter("p")).toBe(true);    
    });

});