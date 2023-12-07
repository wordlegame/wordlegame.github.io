let uniqueLetters = [];  // This will hold the unique letters
let guessCount = 0;  // This will count the guesses

function endGame(guessCount, didWin, time) {

    // Join the unique letters together into a string, separated by commas
    const letters = Array.from(uniqueLetters).join(', ');

    //If the mode is not timed, set the time to -1
    if (sessionStorage.getItem('mode') !== 'classic') {
        time = -1;
    }

    // Create the game info object
    const gameInfo = {
        finalGuessCount: guessCount,
        letters: letters,
        didWin: didWin,
        time: time
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