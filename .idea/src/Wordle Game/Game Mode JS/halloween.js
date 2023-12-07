/*
    Class: SWE2710- Wordle Project
    Names: Ethan Houseworth, Kadie Degner, Alton Wimer, and Ryan Malvey
    Class Section: 121
    Fall 2023
*/

//Spider HTML
const spiderHTML = 
'<div class="spider" id="spider">' +
'<div class="spiderweb"></div>' +
'<div class="body">' +
    '<div class="eye right"></div>' +
    '<div class="eye left"></div>' +
'</div>' +
'<div class="legs left">' +
    '<div class="leg"></div>' +
    '<div class="leg"></div>' +
    '<div class="leg"></div>' +
    '<div class="leg"></div>' +
'</div>' +
'<div class="legs right">' +
    '<div class="leg"></div>' +
    '<div class="leg"></div>' +
    '<div class="leg"></div>' +
    '<div class="leg"></div>' +
'</div>' +
'</div>';

/**
 * Adds the Halloween features to the Wordle game
 */
const toHalloween = () => {
    //Add spider HTML
    const topHTML = document.getElementById("appendToTop");
    topHTML.innerHTML = spiderHTML;

    //Add spider event listener
    const spider = document.getElementById('spider');
    spider.addEventListener('mouseover', () => {
        spider.classList.add('animation-spiderUp');
        setTimeout(() => {
            spider.classList.remove('animation-spiderUp');
        }, 4000);
    });

    //Add web image
    const web = document.createElement('img');
    web.id = 'web';
    web.src = './Images/web.png';
    web.alt = 'spiderweb';
    web.draggable = 'false';
    topHTML.append(web);

    //Add pumpkin to title
    document.getElementById("title").innerText = 'Wordle🎃';
}