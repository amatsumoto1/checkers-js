import Game from "./model/game.js";
import GameController from "./controller/gamecontroller.js";
import GameView from "./view/gameview.js";

class App {
    constructor() {
        this.model = new Game();
        this.view = new GameView(this.model);
        this.controller = new GameController(this.model, this.view);
    }
};

const app = new App();