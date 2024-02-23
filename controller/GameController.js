import { BoxModel } from "../model/BoxModel.js";

export class GameController {
  constructor() {
    this.gameInProgress = false; // Initialize gameInProgress property
    this.boxes = []; // Array to store references to box elements
  }

  initialize() {
    console.log("INITIALIZING GAME...");
    document.querySelector("#start").addEventListener("click", this.start.bind(this)); // Bind this to start method
    document.querySelector("#end").addEventListener("click", this.end.bind(this)); // Bind this to end method
    this.trackFrog();
  }

  start() {
    console.log("STARTING GAME...");

    // Set gameInProgress flag to true
    this.gameInProgress = true;

    // Remove existing event listeners
    this.removeBoxEventListeners();

    // Create and append two boxes to the game board
    for (let i = 0; i < 2; i++) {
      const box = new BoxModel();
      this.appendBoxToBoard(box.color);
    }

    // Add event listeners to the newly created boxes
    this.addBoxEventListeners();
  }

  end() {
    console.log("ENDING GAME...");
    this.gameInProgress = false; // Use this keyword to access class property
    this.removeBoxEventListeners();
  }

  appendBoxToBoard(color) {
    console.log("APPENDING BOX TO BOARD...");
    // Create a new box element
    const newBox = document.createElement("div");
    newBox.className = "box";
    newBox.setAttribute("data-color", color); // Set the color as a data attribute

    // Append the new box to the game board
    const gameBoard = document.querySelector(".board");
    gameBoard.appendChild(newBox);

    // Push the reference to the box element into the boxes array
    this.boxes.push(newBox);
  }

  addBoxEventListeners() {
    console.log("ADD BOX EVENT LISTENERS...");
    this.boxes.forEach((box) => {
      box.addEventListener("click", this.boxClickHandler.bind(this)); // Bind this to boxClickHandler
    });
  }

  removeBoxEventListeners() {
    console.log("REMOVE BOX EVENT LISTENERS...");
    this.boxes.forEach((box) => {
      box.removeEventListener("click", this.boxClickHandler.bind(this)); // Bind this to boxClickHandler
    });
  }

  boxClickHandler(event) {
    const clickedBox = event.target;
    const clickX = event.clientX - clickedBox.getBoundingClientRect().left;

    // Create a new box with a random color
    const newBox = new BoxModel();
    const newBoxElement = document.createElement("div");
    newBoxElement.className = "box";
    newBoxElement.setAttribute("data-color", newBox.color);

    // Insert the new box either before or after the clicked box based on the click position
    if (clickX < clickedBox.offsetWidth / 2) {
      // Clicked on the left side of the box
      clickedBox.parentNode.insertBefore(newBoxElement, clickedBox);
      this.boxes.splice(this.boxes.indexOf(clickedBox), 0, newBoxElement);
    } else {
      // Clicked on the right side of the box
      clickedBox.parentNode.insertBefore(newBoxElement, clickedBox.nextSibling);
      this.boxes.splice(this.boxes.indexOf(clickedBox) + 1, 0, newBoxElement);
    }

    // Add event listeners to the newly created box
    newBoxElement.addEventListener("click", this.boxClickHandler.bind(this));
  }

  trackFrog() {
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
}
