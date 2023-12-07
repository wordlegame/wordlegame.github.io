/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

/* Switches the menu mode to Thanksgiving */
const toThanksgiving = () => {
    //Add and animate leaves 
    animateLeaves(35);
    //Set the mode title to Thanksgiving
    document.getElementById("modeTitle").innerText = "Thanksgiving";     
}

/**
* Randomly animates the specified number of leaves
* @param {number} numLeaves number of leaves
*/
const animateLeaves = (numLeaves) => {

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
    let topHTML = document.getElementById("appendToTop");
    
    for (let i = 0; i < numLeaves; i++) {
        //Creates leaf image element
        let leaf = document.createElement("img");
        leaf.src = "Images/leaf.png";
        leaf.classList.add("leaf");

        const originalX = randomNumber(5, 95); //Starting x value
        const direction = randomDirection(5); //Adds or subtracts 5 from the x axis view width
        const scale = randomNumber(0.01, 0.9); //Scale
        const fallTime = randomNumber(20, 30); //Fall time (in seconds)
        const timeDelay = -1 * randomNumber(0, 50); //Time delay (in seconds)
        
        leaf.style.setProperty('--rotation-start', randomNumber(-360, 360) + 'deg'); //Set rotation start
        leaf.style.setProperty('--rotation-end', randomNumber(-360, 360) + 'deg'); //Set rotation end
        leaf.style.setProperty('--original-x', originalX + 'vw'); //Set original x value
        leaf.style.setProperty('--final-x', originalX + direction + 'vw'); //Set final x value
        leaf.style.setProperty('--scale', scale); //Set scale
        leaf.style.setProperty('--fall-time', fallTime + 's'); //Set fall time
        leaf.style.setProperty('--time-delay', timeDelay + 's'); //Set fall time delay
        
        //Adds leaf to HTML
        topHTML.append(leaf);
    }
}