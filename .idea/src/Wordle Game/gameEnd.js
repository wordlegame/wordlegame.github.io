let gamesWonHistogram = [0, 0, 0, 0, 0, 0];

const endMenuOpen = (gameWon, mode) => {
    const games = loadGames();
    const totalGames = Object.keys(games).length;
    let totalGamesWon = 0;
    for(let i = 0; i < totalGames; i++) {
        if(Object.values(games)[i].didWin) { // Checks that the user won the game
            gamesWonHistogram[Object.values(games)[i].finalGuessCount - 1]++;
            totalGamesWon++;
        }
    }

    // Update the histogram

    let highestValue = Math.max(...gamesWonHistogram);

    for(let i = 1; i < 7; i++) {
        let progress = document.getElementById(i + "Guesses");
        let percent = (gamesWonHistogram[i - 1] / highestValue) * 100;
        percent = Math.round(percent);
        progress.setAttribute("value", percent + "");
        progress.setAttribute("max", "100");
        
        let text = document.getElementById(i + "GuessesText");
        text.textContent = gamesWonHistogram[i - 1] + "";
    }

    document.getElementById("endMenu").style.display = "block";
    if(gameWon) {
        document.getElementById("gameResult").textContent = "You guessed the correct word!";
    } else {
        document.getElementById("gameResult").textContent = "You ran out of guesses.";
    }
}


const endMenuClose = () => {
    document.getElementById("endMenu").style.display = "none";
}

function loadGames() {
    const gamesJSON = localStorage.getItem('games');
    return gamesJSON ? JSON.parse(gamesJSON) : {};
}