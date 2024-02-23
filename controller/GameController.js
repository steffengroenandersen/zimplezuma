import { GameView } from "../view/GameView.js";
import { BoxSnake } from "../model/BoxSnake.js";
import { BoxModel } from "../model/BoxModel.js";

export class GameController {
  constructor() {
    this.gameView = new GameView(this);
    this.boxSnake = new BoxSnake();
    this.gameInProgress = false;
  }

  initialize() {
    console.log("INITIALIZING GAME...");
    this.gameView.renderView();
    this.gameView.trackFrog();
  }

  start() {
    if (this.gameInProgress) return;
    console.log("STARTING GAME...");

    this.gameInProgress = true;

    for (let i = 0; i < 5; i++) {
      const box = new BoxModel();
      this.boxSnake.addLast(box);
    }

    this.gameView.renderView();
  }

  end() {
    console.log("ENDING GAME...");
    this.gameInProgress = false;
    this.removeBoxEventListeners();
  }

  boxClickHandler(event) {
    console.log("GameController says: boxClickHandler()");
    const clickedBox = event.target;
    const clickX = event.clientX - clickedBox.getBoundingClientRect().left;

    const newBox = new BoxModel();

    if (clickX < clickedBox.offsetWidth / 2) {
      console.log("Clicked left");
      this.boxSnake.insertBeforeIndex(newBox, 1);
    } else {
      console.log("Clicked right");
      this.boxSnake.insertAfterIndex(newBox, 1);
    }
    this.gameView.renderView();
  }
}
