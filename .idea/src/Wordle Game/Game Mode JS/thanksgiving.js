/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

const thanksgivingHTML = 
'<img id="turkey" src="./Images/turkeyWithPie.png" alt="turkey with a pumpkin pie" draggable="false">' +
'<img id="turkey2" src="./Images/turkeyWithGuitar.png" alt="turkey with a guitar" draggable="false">' +
'<img id="leaves" src="./Images/leaves.png" alt="leaves" draggable="false">' +
'<img id="leaves2" src="./Images/leaves2.png" alt="leaves" draggable="false">';

/**
 * Adds the Thanksgiving features to the Wordle game
 */
const toThanksgiving = () => {
    //Add Thanksgiving images
    document.getElementById("appendToTop").innerHTML = thanksgivingHTML;

    //Add turkey to title
    document.getElementById("title").innerText = "Wordle🦃";
}