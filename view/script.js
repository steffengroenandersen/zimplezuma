"use strict";

import { GameController } from "../controller/GameController.js";

window.addEventListener("load", load);

const gameController = new GameController();

function load() {
  gameController.initialize();

  // Select the frog-box element
  const frogBox = document.querySelector(".frog-box");

  // Add mousemove event listener to the document
  document.addEventListener("mousemove", (event) => {
    // Calculate the position of the mouse relative to the viewport
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate the center coordinates of the frog box
    const frogBoxRect = frogBox.getBoundingClientRect();
    const frogBoxCenterX = frogBoxRect.left + frogBoxRect.width / 2;
    const frogBoxCenterY = frogBoxRect.top + frogBoxRect.height / 2;

    // Calculate the angle between the mouse position and the center of the frog box
    const angle = Math.atan2(mouseY - frogBoxCenterY, mouseX - frogBoxCenterX);

    // Convert the angle from radians to degrees
    const angleDegrees = angle * (180 / Math.PI);

    // Set the rotation of the frog box using CSS transform
    frogBox.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg)`;
  });
}
