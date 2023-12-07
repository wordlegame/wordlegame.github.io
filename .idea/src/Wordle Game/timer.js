let trackTime;
let startingMinutes;

const time = () => {
    let sec = 0;
    let minutes = 0;
    trackTime = setInterval(() => {
        sec++;
        if (sec === 60) {
            minutes++;
            sec = 0;
        }
        if (sec < 10 && minutes < 10) {
            document.getElementById("timerText").innerText = "0" + minutes + ":0" + sec;
        } else if (sec < 10) {
            document.getElementById("timerText").innerText = minutes + ":0" + sec;
        } else if (minutes < 10) {
            document.getElementById("timerText").innerText = "0" + minutes + ":" + sec;
        } else {
            document.getElementById("timerText").innerText = minutes + ":" + sec;
        }
    }, 1000);
}

const stopTime = () => {
    if (trackTime !== undefined) {
        clearInterval(trackTime);
    }
    return document.getElementById("timerText").innerText;
}

const startEasyTimer = () => {
    startingMinutes = 5;
    timer();
}

const startMediumTimer = () => {
    startingMinutes = 3;
    timer();
}

const startHardTimer = () => {
    startingMinutes = 1;
    timer();
}

const startCustomTimer = () => {
    customMinutes = document.getElementById("customTimeInput").value;
    if(Number.isInteger(parseFloat(customMinutes)) && customMinutes >= 1 && customMinutes <= 60) {
        startingMinutes = customMinutes;
        timer();
    }
}

const timer = () => {
    document.getElementById("timerSelection").style.display = "none";
    document.addEventListener("keydown", keyPressHandler);  //keypress detector
    document.getElementById("keyboardDiv").addEventListener("click", keyPressHandler);  //onscreen keyboard click detector
    let sec = 1;
    trackTime = setInterval(() => {
        sec--;

        if (sec < 10 && startingMinutes < 10) {
            document.getElementById("timerText").innerText = "0" + startingMinutes + ":0" + sec;
        } else if (sec < 10) {
            document.getElementById("timerText").innerText = startingMinutes + ":0" + sec;
        } else if (startingMinutes < 10) {
            document.getElementById("timerText").innerText = "0" + startingMinutes + ":" + sec;
        } else {
            document.getElementById("timerText").innerText = startingMinutes + ":" + sec;
        }


        if (sec === 0 && startingMinutes === 0) {
            stopTime();
            endMenuOpen(false);
            showCorrectWord();
            document.getElementById("gameResult").textContent = "You ran out of time.";
            document.getElementById("endMenuClose").onclick = endMenuClose;
            endGame(guessCount, false, -1);
            document.removeEventListener("keydown", window.keyPressHandler);
        }
       
        if (sec === 0) {
            startingMinutes--;
            sec = 60;
        }

    }, 1000);
}