/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

/**
 * Switches the menu mode to christmas
 */
const toChristmas = () => {
    //Add and animate the snowflakes
    animateSnowflakes(300);
    //Set the mode title to Christmas
    document.getElementById("modeTitle").innerText = "Christmas";
}

/**
* Randomly animates the specified number of snowflakes
* @param {number} numSnowflakes number of snowflakes
*/
const animateSnowflakes = (numSnowflakes) => {

    //Random number between min and max (inclusive)
    const randomNumber = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    //Randomly returns the positive or negative number
    const randomDirection = (num) => {
        if (Math.random() > 0.49) {
            return num;
        } else {
            return -1 * num;
        }
    }

    //Get div at the top of the HTML 
    let snow = document.getElementById("appendToTop");
    
    for (let i = 0; i < numSnowflakes; i++) {
        let snowflake = document.createElement("div");
        snowflake.classList.add("snow");

        const originalX = randomNumber(0, 100); //Starting x value
        const width = randomNumber(1, 10); //Random width between 1 and 10px
        const height = width; //Height set to same value as width
        const direction = randomDirection(5); //Adds or subtracts 5 from the x axis view width
        const scale = randomNumber(0.01, 0.9); //Scale
        const fallTime = randomNumber(10,25); //Fall time (in seconds)
        const timeDelay = -1 * randomNumber(10,20); //Time delay (in seconds)
        
        snowflake.style.setProperty('--width', width + 'px'); //Set width
        snowflake.style.setProperty('--height', height + 'px'); //Set height
        snowflake.style.setProperty('--opacity', randomNumber(0.5, 0.8)); //Set snowflake opacity
        snowflake.style.setProperty('--original-x', originalX + 'vw'); //Set original x value
        snowflake.style.setProperty('--final-x', originalX + direction + 'vw'); //Set final x value
        snowflake.style.setProperty('--scale', scale); //Set scale
        snowflake.style.setProperty('--fall-time', fallTime + 's'); //Set fall time
        snowflake.style.setProperty('--time-delay', timeDelay + 's'); //Set fall time delay
        
        //Adds snowflake to snow div element
        snow.append(snowflake);
    }
}