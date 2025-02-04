// ==UserScript==
// @name         StudySpot
// @namespace    http://tampermonkey.net/
// @version      1.3
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

function nextTrack() {
    document.querySelector('[data-testid="control-button-skip-forward"]').click();
}

function prevTrack() {
    document.querySelector('[data-testid="control-button-skip-back"]').click();
}


(function() {
    'use strict';

   (function() {
    'use strict';

    // Create a container div
    const controlContainer = document.createElement("div");
    controlContainer.style.position = "fixed";
    controlContainer.style.bottom = "20px";
    controlContainer.style.right = "20px";
    controlContainer.style.display = "flex";  // Horizontal stacking
    controlContainer.style.gap = "10px";  // Spacing between buttons
    controlContainer.style.padding = "10px";
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

    // Append buttons to the container
    controlContainer.appendChild(prevButton);
    controlContainer.appendChild(playPauseButton);
    controlContainer.appendChild(nextButton);

    // Append container to the page
    document.body.appendChild(controlContainer);
})();


    // Append button to body
    document.body.appendChild(button);
})();

