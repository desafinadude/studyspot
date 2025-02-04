// ==UserScript==
// @name         StudySpot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skeleton For Spotify Study App
// @author       Desafinadude
// @match        *://open.spotify.com/*
// @grant        none
// ==/UserScript==

function seekToPercentage(percentage) {
    const progressBar = document.querySelector('[data-testid="progress-bar"]');
    const fiberKey = Object.keys(progressBar).find(key => key.startsWith("__reactFiber"));
    const fiberNode = progressBar[fiberKey];

   

    const rect = progressBar.getBoundingClientRect();
    const xPosition = rect.left + (rect.width * (percentage / 100));

    // Create a real PointerEvent
    const event = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: xPosition,
        clientY: rect.top + (rect.height / 2), // Center of the progress bar
        pointerId: 1,
        pointerType: "mouse"
    });

    // Dispatch the event on the progress bar
    progressBar.dispatchEvent(event);
}

function playPause() {
    document.querySelector('[data-testid="control-button-playpause"]').click();
}

function nextTrack() {
    document.querySelector('[data-testid="control-button-skip-forward"]').click();
}

function prevTrack() {
    document.querySelector('[data-testid="control-button-skip-back"]').click();
}




   (function() {
    'use strict';

    // Create a container div
    const controlContainer = document.createElement("div");
    controlContainer.style.position = "fixed";
    controlContainer.style.top = "0px";
    controlContainer.style.right = "0px";
    controlContainer.style.display = "flex";  // Horizontal stacking
    controlContainer.style.gap = "5px";  // Spacing between buttons
    controlContainer.style.padding = "5px";
    controlContainer.style.background = "rgba(0, 0, 0, 0.8)";  // Semi-transparent black
    controlContainer.style.borderRadius = "10px";
    controlContainer.style.zIndex = "9999";

    // Function to create a styled button
    function createButton(text, onClick) {
        const button = document.createElement("button");
        button.innerText = text;
        button.style.padding = "10px 15px";
        button.style.background = "#1DB954";  // Spotify green
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.addEventListener("click", onClick);
        return button;
    }

    // Create buttons
    const playPauseButton = createButton("Play/Pause", () => {
        document.querySelector('[data-testid="control-button-playpause"]').click();
    });

    const nextButton = createButton("Next", () => {
        document.querySelector('[data-testid="control-button-skip-forward"]').click();
    });

    const prevButton = createButton("Prev", () => {
        document.querySelector('[data-testid="control-button-skip-back"]').click();
    });

    const seekButton = createButton("80", () => {
        seekToPercentage(80);
    });

    

    // Append buttons to the container
    controlContainer.appendChild(prevButton);
    controlContainer.appendChild(playPauseButton);
    controlContainer.appendChild(nextButton);
    controlContainer.appendChild(seekButton);
       

    // Append container to the page
    document.body.appendChild(controlContainer);
})();
    


