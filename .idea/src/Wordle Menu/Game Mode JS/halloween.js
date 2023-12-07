/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

const ghostHTML = 
'<div id="ghost">' +
'<div id="ghostBody">' +
    '<div id="ghostEyes"></div>' +
    '<div id="ghostMouth"></div>' +
    '<div id="ghostFeet">' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
    '</div>' +
'</div>' +
'</div>';

/* Switches the menu mode to Halloween */
const toHalloween = () => {
    //Set the mode title to Halloween
    document.getElementById("modeTitle").innerText = "Halloween";
    //Add the ghost HTML
    document.getElementById("appendToTop").innerHTML = ghostHTML;    
}