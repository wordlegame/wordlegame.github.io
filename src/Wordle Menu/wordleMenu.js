/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

window.onload = () => {
    //How to Play open button functionality
    let help_button = document.getElementById("howToPlayButton");
    help_button.onclick = openHelpForm;
    
    
    //How To Play close button functionality
    let close_button = document.getElementById("closeButton");
    close_button.onclick = closeHelpForm;

}

const openHelpForm = () => {
    document.getElementById("howToPlayContainer").style.display = "block";
}

const closeHelpForm = () => {
    document.getElementById("howToPlayContainer").style.display = "none";
}



