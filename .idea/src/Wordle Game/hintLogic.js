let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

//Finds the current correct guessed letters
const currentCorrectGuessedLetters = () => {
    let correctGuessedLetters = ["_", "_", "_", "_", "_"];
    for(let i = 0; i < keyboardLetters.length; i++) {
        if(keyboardLetters[i] === "green") {
            for (let j = 0; j < correctWord.length; j++) {
                if (letters[i] === correctWord.charAt(j)) {
                    correctGuessedLetters[j] = letters[i];
                }
            }
        }
    }
    return correctGuessedLetters;
}

//
const loadPossibleWords = () => {
    let greenLetters = currentCorrectGuessedLetters();
    let hintArray = [];

    //Adds every possible word to the hintArray
    for(let i = 0; i < wordGuessesArray.length; i++) {
        let word = wordGuessesArray[i];
        let possible = true;
        for(let j = 0; j < word.length; j++) {
            if (greenLetters[j] !== "_" && greenLetters[j] !== word.charAt(j)) {
                possible = false;
            } else if (keyboardLetters[letters.indexOf(word.charAt(j))] === "gray") {
                possible = false;
            }
        }
        if(possible) {
            hintArray.push(word);
        }
    }

    return hintArray;
};

const displayPossibleHints = () => {
    let hintArray = loadPossibleWords();
    
    const list = document.getElementById("hintList");
    list.innerText = "";

    for (let i = 0; i < hintArray.length; i++) {
        let hint = document.createElement("li");
        hint.innerText = hintArray[i];
        list.appendChild(hint);
    }
}

