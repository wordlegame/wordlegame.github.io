// User Stats
function loadGames() {
    const gamesJSON = localStorage.getItem('games');
    return gamesJSON ? JSON.parse(gamesJSON) : {};

    // return {
    //     '1': {
    //         finalGuessCount: 4,
    //         letters: 'a, b, c, d, e'
    //     },
    //     '2': {
    //         finalGuessCount: 2,
    //         letters: 'a, b, c, d, e, f, g, h'
    //     },
    //     '3': {
    //         finalGuessCount: 3,
    //         letters: 'a, i, j, k, l, m, n, o, p'
    //     },
    // };
}

function guessAverage() {
    const games = loadGames();
    const totalGames = Object.keys(games).length;
    if (totalGames === 0) return 0;
    
    const totalGuesses = Object.values(games).reduce((sum, game) => sum + game.finalGuessCount, 0);
    return (totalGuesses / totalGames).toFixed(2);
}

function maxWinStreak() {
    const games = loadGames();
    let maxStreak = 0, currentStreak = 0;
    Object.values(games).forEach(game => {
        if (game.didWin) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    });
    return maxStreak;
}

function currentWinStreak() {
    const games = loadGames();
    let currentStreak = 0;
    const gameValues = Object.values(games);
    for (let i = gameValues.length - 1; i >= 0; i--) {
        if (gameValues[i].didWin) {
            currentStreak++;
        } else {
            break;
        }
    }
    return currentStreak;
}

function letterFrequency() {
    const games = loadGames();
    const letterCounts = {};
    Object.values(games).forEach(game => {
        game.letters.split(', ').forEach(letter => {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        });
    });
    return letterCounts;
}

function mostGuessedLetter() {
    const letterCounts = letterFrequency();
    const mostGuessed = Object.entries(letterCounts).sort((a, b) => b[1] - a[1])[0];
    return mostGuessed ? mostGuessed[0] : null;
}

function winPercentage() {
    const games = loadGames();
    const totalGames = Object.keys(games).length;
    if (totalGames === 0) return '0%';
    
    const wins = Object.values(games).filter(game => game.finalGuessCount < 6).length;
    return ((wins / totalGames) * 100).toFixed(0) + '%';
}

function totalGamesPlayed() {
    const games = loadGames();
    return Object.keys(games).length;
}

function totalWins() {
    const games = loadGames();
    return Object.values(games).filter(game => game.finalGuessCount < 6).length;
}

function totalLosses() {
    const games = loadGames();
    return Object.values(games).filter(game => game.finalGuessCount >= 6).length;
}

/**
 * Gets the fastest game time from local storage game data
 * @returns the fastest game in classic mode
 */
function fastestGame() {
    //Loads game data from local storage and creates an array of game times in seconds
    const games = loadGames();
    const gamesInSeconds = Object.values(games).map((game) => {
        let seconds;
        if (game.time !== null || game.time !== undefined) {
            seconds = inSeconds(game.time);
        } else {
            seconds = inSeconds(-1);
        }
        return seconds;
    });

    //Get an array of the fastest classic mode games in seconds
    const classicGamesInSeconds = gamesInSeconds.filter((time) => time >= 0);

    //Display string
    let display;

    //If the games have no elements (no games played), the default display is "-"
    if (classicGamesInSeconds.length === 0) {
        display = "-";
    } else {
        //Gets the fastest time and converts it to timer format
        const fastestTimeInSeconds = Math.min(...classicGamesInSeconds);
        display = inTimerFormat(fastestTimeInSeconds);
    }
    return display;
}

/**
 * Translates a timer display to the number of seconds. 
 * If the time is invalid (-1), the same time is returned.
 * @param {*} time time in timer format
 * @returns time in seconds or -1 if invalid
 */
const inSeconds = (time) => {
    //Get seconds and minutes from timer and return total seconds (if the time is valid)
    if (time !== -1) {
        const timeArray = time.split(':');
        const seconds = parseInt(timeArray[1]);
        const minutes = parseInt(timeArray[0]);
        time = minutes * 60 + seconds;
    }

    return time;
}

/**
 * Creates the timer display string from the number of seconds
 * @param {Number} timeInSeconds time in seconds
 * @returns Timer display string
 */
const inTimerFormat = (timeInSeconds) => {
    //Default minutes and seconds
    let minutes = 0;
    let seconds = 0;
    let display;

    //Set minutes and seconds if seconds is greater than 1
    if (timeInSeconds >= 60) {
        minutes = Math.floor(timeInSeconds / 60);
        seconds = timeInSeconds % 60;
    } else {
        seconds = timeInSeconds;
    }
    //Set timer display
    display = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    return display;
}

// If your statistics functions are defined in another file, 
// make sure to import them here, or just define them in this file.

// Define a function to update the DOM with your statistics
function updateStatistics() {
    document.getElementById('currentWinStreak').textContent = currentWinStreak();
    document.getElementById('longestWinStreak').textContent = maxWinStreak();
    document.getElementById('avgNumGuesses').textContent = guessAverage();
    document.getElementById('mostCommonLetter').textContent = mostGuessedLetter();
    document.getElementById('totalGamesPlayed').textContent = totalGamesPlayed();
    document.getElementById('totalGamesWon').textContent = totalWins();
    document.getElementById('totalGamesLost').textContent = totalLosses();
    document.getElementById('winPercentage').textContent = winPercentage();
    document.getElementById('fastestGame').textContent = fastestGame();
}


// module.exports = {
//     guessAverage: guessAverage,
//     maxWinStreak: maxWinStreak,
//     currentWinStreak: currentWinStreak,
//     letterFrequency: letterFrequency,
//     mostGuessedLetter: mostGuessedLetter,
//     leastGuessedLetter: leastGuessedLetter,
//     winPercentage: winPercentage,
//     totalGamesPlayed: totalGamesPlayed
// }
  
// Call updateStatistics when the document is loaded
//window.onload = updateStatistics;
