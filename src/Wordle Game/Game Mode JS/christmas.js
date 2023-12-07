/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

const imagesHTML = 
'<img id="reindeer" src="./Images/reindeer.png" alt="reindeer" draggable="false">' +
'<img id="lights" src="./Images/lights.png" alt="lights" draggable="false">' +
'<img id="lights2" src="./Images/lights2.png" alt="lights" draggable="false">' +
'<img id="santa" src="./Images/santa.png" alt="presents" draggable="false">' +
'<div id="nose"></div>';

/**
 * Adds the Christmas features to the Wordle game
 */
const toChristmas = () => {
    //Add Christmas images
    document.getElementById("appendToTop").innerHTML = imagesHTML;

    //Add tree to title
    document.getElementById("title").innerText = "Wordle🎄";
}