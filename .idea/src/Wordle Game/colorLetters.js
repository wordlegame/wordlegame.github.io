let keyboardLetters = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];

function checkLetters(guess) {
    let colorArray = ["gray", "gray", "gray", "gray", "gray"];
    let guessCharacters = [];
    let correctWordCharacters = [];
    guessCharacters = guess.split('');
    correctWordCharacters = correctWord.split('');
    let letterTaken = [false, false, false, false, false];

    for(let i = 0; i < 5; i++) {
        if(guessCharacters[i] === correctWordCharacters[i]) {
            colorArray[i] = "green";
            letterTaken[i] = true;
        }
    }

    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 5; j++) {
            if(guessCharacters[i] === correctWordCharacters[j] && !letterTaken[j] && colorArray[i] === "gray") {
                colorArray[i] = "yellow";
                letterTaken[j] = true;
            }
        }
    }
    return colorArray;
}

function colorLetters(colorArray) {
    for(let i = 1; i < 6; i++) {
        document.getElementById("" + (6 - guessesRemaining) + i).classList.remove("hover");
    }
    if (selectedmode !== 'timed') {
        return new Promise((resolve) => {
            let currentRow = 6 - guessesRemaining;
            document.getElementById(currentRow + "1").classList.add(colorArray[0]);
            setTimeout(() => {
                document.getElementById(currentRow + "2").classList.add(colorArray[1]);
                setTimeout(() => {
                    document.getElementById(currentRow + "3").classList.add(colorArray[2]);
                    setTimeout(() => {
                        document.getElementById(currentRow + "4").classList.add(colorArray[3]);
                        setTimeout(() => {
                            document.getElementById(currentRow + "5").classList.add(colorArray[4]);
                            resolve();
                        }, 250);
                    }, 250);
                }, 250);
            }, 250);
            if(selectedmode === "hard") {
                setTimeout(() => {
                    document.getElementById(currentRow + "1").innerHTML = "";
                    setTimeout(() => {
                        document.getElementById(currentRow + "2").innerHTML = "";
                        setTimeout(() => {
                            document.getElementById(currentRow + "3").innerHTML = "";
                            setTimeout(() => {
                                document.getElementById(currentRow + "4").innerHTML = "";
                                setTimeout(() => {
                                    document.getElementById(currentRow + "5").innerHTML = "";
                                    resolve();
                                }, 250);
                            }, 250);
                        }, 250);
                    }, 250);
                }, 1000);
            }
        });
    } else {
        return new Promise((resolve) => {
            let currentRow = 6 - guessesRemaining;
            document.getElementById(currentRow + "1").classList.add(colorArray[0]);
            setTimeout(() => {
                document.getElementById(currentRow + "2").classList.add(colorArray[1]);
                setTimeout(() => {
                    document.getElementById(currentRow + "3").classList.add(colorArray[2]);
                    setTimeout(() => {
                        document.getElementById(currentRow + "4").classList.add(colorArray[3]);
                        setTimeout(() => {
                            document.getElementById(currentRow + "5").classList.add(colorArray[4]);
                            resolve();
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        });
    }
}

function colorKeyboard(colorArray, guess) {
    if(selectedmode != "hard") {
        for(let i = 0; i < 5; i++) {
            let letterIndex = parseInt(guess[i], 36) - 10;
            if((keyboardLetters[letterIndex] === "empty") || (keyboardLetters[letterIndex] === "gray" && (colorArray[i] === "yellow" || colorArray[i] === "green")) || (keyboardLetters[letterIndex] === "yellow" && (colorArray[i] === "green"))) {
                keyboardLetters[letterIndex] = colorArray[i];
            }
        }
        for(let i = 0; i < 5; i++) {
            if(keyboardLetters[parseInt(guess[i], 36) - 10] === 'yellow') {
                setTimeout(() => document.getElementById(guess[i]).style.color = "white", 4000);
                setTimeout(() => document.getElementById(guess[i]).style.backgroundColor = "#c8b653", 4000);
                setTimeout(() => document.getElementById(guess[i]).style.borderColor = "#c8b653", 4000);
            }
            if(keyboardLetters[parseInt(guess[i], 36) - 10] === 'green') {
                document.getElementById(guess[i]).classList.remove('yellowKey');
            }
        }
        if (selectedmode !== 'timed') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    document.getElementById(guess[0]).classList.add(keyboardLetters[parseInt(guess[0], 36) - 10] + "Key");
                    setTimeout(() => {
                        document.getElementById(guess[1]).classList.add(keyboardLetters[parseInt(guess[1], 36) - 10] + "Key");
                        setTimeout(() => {
                            document.getElementById(guess[2]).classList.add(keyboardLetters[parseInt(guess[2], 36) - 10] + "Key");
                            setTimeout(() => {
                                document.getElementById(guess[3]).classList.add(keyboardLetters[parseInt(guess[3], 36) - 10] + "Key");
                                setTimeout(() => {
                                    document.getElementById(guess[4]).classList.add(keyboardLetters[parseInt(guess[4], 36) - 10] + "Key");
                                    resolve();
                                }, 250);
                            }, 250);
                        }, 250);
                    }, 250);
                }, 250);
            });
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    document.getElementById(guess[0]).classList.add(keyboardLetters[parseInt(guess[0], 36) - 10] + "Key");
                    setTimeout(() => {
                        document.getElementById(guess[1]).classList.add(keyboardLetters[parseInt(guess[1], 36) - 10] + "Key");
                        setTimeout(() => {
                            document.getElementById(guess[2]).classList.add(keyboardLetters[parseInt(guess[2], 36) - 10] + "Key");
                            setTimeout(() => {
                                document.getElementById(guess[3]).classList.add(keyboardLetters[parseInt(guess[3], 36) - 10] + "Key");
                                setTimeout(() => {
                                    document.getElementById(guess[4]).classList.add(keyboardLetters[parseInt(guess[4], 36) - 10] + "Key");
                                    resolve();
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            });
        }
    }
}