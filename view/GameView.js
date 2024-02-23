export class GameView {
  constructor(gameController) {
    this.gameController = gameController;
    this.startClickListener = () => this.gameController.start();
    this.endClickListener = () => this.gameController.end();
    this.gameBoard = document.querySelector(".board"); // Define gameBoard here
  }

  renderView() {
    this.destroyView(); // Destroy previous view
    console.log("GameView says: renderView()");

    document.querySelector("#start").addEventListener("click", this.startClickListener);
    document.querySelector("#end").addEventListener("click", this.endClickListener);

    // Create HTML boxes for each box in the BoxSnake
    this.gameController.boxSnake.traverse((box) => {
      const newBox = document.createElement("div");
      newBox.className = "box";
      newBox.setAttribute("data-color", box.data); // Set the color as a data attribute
      this.gameBoard.appendChild(newBox);
    });

    // Add event listeners to the newly created boxes
    this.addBoxEventListeners();
  }

  destroyView() {
    console.log("GameView says: destroyView()");
    this.gameBoard.innerHTML = "";

    document.querySelector("#start").removeEventListener("click", this.startClickListener);
    document.querySelector("#end").removeEventListener("click", this.endClickListener);

    this.removeBoxEventListeners();
  }

  addBoxEventListeners() {
    console.log("ADD BOX EVENT LISTENERS...");
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", this.gameController.boxClickHandler.bind(this.gameController));
    });
  }

  removeBoxEventListeners() {
    console.log("REMOVE BOX EVENT LISTENERS...");
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.removeEventListener("click", this.gameController.boxClickHandler.bind(this.gameController));
    });
  }

  trackFrog() {
    const frogBox = document.querySelector(".frog-box");

    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const frogBoxRect = frogBox.getBoundingClientRect();
      const frogBoxCenterX = frogBoxRect.left + frogBoxRect.width / 2;
      const frogBoxCenterY = frogBoxRect.top + frogBoxRect.height / 2;

      const angle = Math.atan2(mouseY - frogBoxCenterY, mouseX - frogBoxCenterX);

      const angleDegrees = angle * (180 / Math.PI);

      frogBox.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg)`;
    });
  }
}
