async function loadAllowedGuesses(fileURL) {
    try {
        const response = await fetch(fileURL);
        const fileContents = await response.text();
        let wordGuessesArray = fileContents.split('\n');
        for (let i = 0; i < wordGuessesArray.length; i++) {
            wordGuessesArray[i] = wordGuessesArray[i].substring(0, 5);
        }
        return wordGuessesArray;
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}

async function loadCorrectWord(fileURL) {
    try {
        const response = await fetch(fileURL);
        const fileContents = await response.text();
        let wordAnswersArray = fileContents.split('\n');
        for (let i = 0; i < wordAnswersArray.length; i++) {
            wordAnswersArray[i] = wordAnswersArray[i].substring(0, 5);
        }
        correctWord = wordAnswersArray[Math.floor(Math.random() * wordAnswersArray.length)];
        return correctWord;
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}