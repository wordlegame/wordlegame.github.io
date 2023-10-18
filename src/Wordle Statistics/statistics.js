// User Stats
function loadGames() {
    const gamesJSON = localStorage.getItem('games');
    return gamesJSON ? JSON.parse(gamesJSON) : {};
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
        if (game.finalGuessCount < 6) {
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
        if (gameValues[i].finalGuessCount < 6) {
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

function leastGuessedLetter() {
    const letterCounts = letterFrequency();
    const leastGuessed = Object.entries(letterCounts).sort((a, b) => a[1] - b[1])[0];
    return leastGuessed ? leastGuessed[0] : null;
}

function winPercentage() {
    const games = loadGames();
    const totalGames = Object.keys(games).length;
    if (totalGames === 0) return '0.00%';
    
    const wins = Object.values(games).filter(game => game.finalGuessCount < 6).length;
    return ((wins / totalGames) * 100).toFixed(2) + '%';
}

function totalGamesPlayed() {
    const games = loadGames();
    return Object.keys(games).length;
}

// If your statistics functions are defined in another file, 
// make sure to import them here, or just define them in this file.

// Define a function to update the DOM with your statistics
function updateStatistics() {
    document.getElementById('currentWinStreak').textContent = currentWinStreak();
    document.getElementById('longestWinStreak').textContent = maxWinStreak();
    document.getElementById('avgNumGuesses').textContent = guessAverage();
    document.getElementById('mostCommonLetter').textContent = mostGuessedLetter();
    document.getElementById('leastCommonLetter').textContent = leastGuessedLetter();
    document.getElementById('totalGamesPlayed').textContent = totalGamesPlayed();
    document.getElementById('totalGamesWon').textContent = '';  // You'll need a function to compute this
    document.getElementById('totalGamesLost').textContent = '';  // You'll need a function to compute this
    document.getElementById('winPercentage').textContent = winPercentage();
}
  
// Call updateStatistics when the document is loaded
window.onload = updateStatistics;