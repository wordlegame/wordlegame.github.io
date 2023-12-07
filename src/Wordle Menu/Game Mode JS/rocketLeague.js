/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

/* Switches the menu mode to Rocket League */
const toRocketLeague = () => {
    //add rocket league image to menu
    const logo = document.createElement("img");
    logo.classList.add('rocketLeagueLogo');
    logo.src = './Images/rocketLeagueLogo.png';
    document.getElementById("appendToTop").append(logo);
}