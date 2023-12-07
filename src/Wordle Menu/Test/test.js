/*
1. Download Jest extension
2. In project, open in integrated terminal and type "npm init -y"
3. In .json, add "jest" after "test":
4. In integrated terminal, type "npm run test" to run the tests
*/
const { openHelpForm, closeHelpForm } = require('./wordleMenu.js');

// Setting up JSDOM to have the necessary elements for testing
beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
    `<div id="howToPlayContainer" style="display:none;"></div>
     <button id="howToPlayButton"></button>
     <button id="closeButton"></button>`;

    require('./wordleUI');
});

describe('Wordle UI functions', () => {

    describe('openHelpForm', () => {
        it('should set display style of howToPlayContainer to "block"', () => {
            openHelpForm();
            const container = document.getElementById("howToPlayContainer");
            expect(container.style.display).toBe("block");
        });
    });

    describe('closeHelpForm', () => {
        it('should set display style of howToPlayContainer to "none"', () => {
            closeHelpForm();
            const container = document.getElementById("howToPlayContainer");
            expect(container.style.display).toBe("none");
        });
    });

    describe('Button Click Events', () => {
        it('should trigger openHelpForm when howToPlayButton is clicked', () => {
            const howToPlayButton = document.getElementById("howToPlayButton");
            howToPlayButton.click();
            const container = document.getElementById("howToPlayContainer");
            expect(container.style.display).toBe("block");
        });

        it('should trigger closeHelpForm when closeButton is clicked', () => {
            const closeButton = document.getElementById("closeButton");
            closeButton.click();
            const container = document.getElementById("howToPlayContainer");
            expect(container.style.display).toBe("none");
        });
    });
});
