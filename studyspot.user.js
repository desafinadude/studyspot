// ==UserScript==
// @name         StudySpot
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Skeleton For Spotify Study App
// @author       Desafinadude
// @match        *://open.spotify.com/*
// @grant        none
// ==/UserScript==

function seekToPercentage(percentage) {
    const progressBar = document.querySelector('[data-testid="progress-bar"]');
    const fiberKey = Object.keys(progressBar).find(key => key.startsWith("__reactFiber"));
    const fiberNode = progressBar[fiberKey];

    if (!fiberNode || !fiberNode.memoizedProps.onPointerDown) {
        console.error("Could not find seek function.");
        return;
    }

    const rect = progressBar.getBoundingClientRect();
    const xPosition = rect.left + (rect.width * (percentage / 100));

    const event = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: xPosition,
        clientY: rect.top + (rect.height / 2),
        pointerId: 1,
        pointerType: "mouse"
    });

    progressBar.dispatchEvent(event);
}

function playPause() {
    document.querySelector('[data-testid="control-button-playpause"]').click();
}

(function() {
    'use strict';

    // Create the button element
    const button = document.createElement("button");
    button.innerText = "Seek 50%";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.background = "#1DB954";  // Spotify green
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999";

    // Add click event to call seek function
    button.addEventListener("click", function() {
        playPause() // Seek to 50%
    });

    // Append button to body
    document.body.appendChild(button);
})();

