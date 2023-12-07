/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

//Get session storage
const storage = window.sessionStorage;

window.onload = () => {
    //Sets default mode based on current date
    const defaultMode = getDefaultMode();
    //Sets window to saved mode or sets to default mode
    const mode = storage.getItem("mode");
    if (mode === null ) {
        storage.setItem("mode", defaultMode);
        changeMode(defaultMode); 
    } else {
        changeMode(mode); 
    }

    //How to Play open button functionality
    let help_button = document.getElementById("howToPlayButton");
    help_button.onclick = openHelpForm;
    
    //How To Play close button functionality
    let close_button = document.getElementById("closeButton");
    close_button.onclick = closeHelpForm;

    //Statistics open button functionality
    let stats_button = document.getElementById("statisticsButton");
    stats_button.onclick = openStatsForm;
  
    //Statistics close button functionality
    let close_stats_button = document.getElementById("closeStatisticsButton");
    close_stats_button.onclick = closeStatsForm;
  
    //Update the statistics
    updateStatistics();

    //Set the mode selector to the current mode and add a change event listener
    const modesSelector = document.getElementById("modesSelector");
    modesSelector.value = storage.getItem("mode");
    modesSelector.addEventListener('change', modesSelectorChange);
}

/**
 * Open how to play
 */
const openHelpForm = () => {
    document.getElementById("howToPlayContainer").style.display = "block";
}

/**
 * Close how to play
 */
const closeHelpForm = () => {
    document.getElementById("howToPlayContainer").style.display = "none";
}

/**
 * Open statistics form
 */
const openStatsForm = () => {
    document.getElementById("statisticsContainer").style.display = "block";
}
 
/**
 * Close statistics form
 */
const closeStatsForm = () => {
    document.getElementById("statisticsContainer").style.display = "none";
}

/**
 * Gets the selected mode and changes the game mode
 */
const modesSelectorChange = () => {
    const modesSelector = document.getElementById("modesSelector");
    const mode = modesSelector.value;
    changeMode(mode);
}

/**
 * Changes the menu based on the mode
 * @param {string} mode game mode
 */
const changeMode = (mode) => {
    //Set the mode in storage to the current mode
    storage.setItem("mode", mode);

    //Clear the previous mode style
    clearMode();

    //Set the current stylesheet to the selected mode stylesheet
    const currentStylesheet = document.getElementById("currentStylesheet");
    currentStylesheet.innerHTML = `<link rel="stylesheet" href="CSS/${mode}.css"></link>`;

    //Dynamically change mode HTML elements
    if (mode === "christmas") {
        toChristmas();     
    } else if (mode === "thanksgiving") {
        toThanksgiving();
    } else if (mode === "halloween") {
       toHalloween(); 
    } else if (mode === "rocketleague") {
        toRocketLeague();
    }
}

/**
 * Reset mode HTML elements
 */
const clearMode = () => {
    //Remove elements appended to the top of the body
    const top = document.getElementById("appendToTop");
    top.textContent = "";

    //Remove Mode Title Text
    document.getElementById("modeTitle").innerText = "";
}

/**
 * Returns the default game mode based on the users current date
 * @returns game mode
 */
const getDefaultMode = () => {
    //Get current date
    const date = new Date();
    //Get current month
    const month = date.getMonth();
    //Get current day
    const day = date.getDate();
    //Get Thanksgiving day for the current year
    const thanksgivingDay = getThanksgivingDay(date.getFullYear());

    let mode;
    if (month === 9) {
        mode = "halloween";
    } else if (month === 10 && day <= thanksgivingDay) {
        mode = "thanksgiving";
    } else if ((month === 10 && day > thanksgivingDay) || (month === 11 && day <= 25)) {
        mode = "christmas";
    } else {
        mode = "classic";
    }
    return mode;
}

/**
 * Gets Thanksgiving day based on the year
 * @param {Number} year year
 * @returns Thanksgiving day
 */
const getThanksgivingDay = (year) => {
    const nov1 = new Date(year, 10, 1);
    const nov1DayOfWeek = nov1.getDay();
    let thanksgivingDay = (nov1DayOfWeek - 4) + 21;
    if (nov1DayOfWeek > 4) {
        thanksgivingDay += 7;
    }
    return thanksgivingDay;
}