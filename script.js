"use strict";

import { GameController } from "./controller/GameController.js";

window.addEventListener("load", load);

const gameController = new GameController();

function load() {
  gameController.initialize();
}
