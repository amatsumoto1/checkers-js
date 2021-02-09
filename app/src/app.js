import Game from "./model/game.js";
import GameView from "./view/gameview.js";

class App {
    constructor() {
        this.model = new Game();
        this.view = new GameView(this.model);
    }
};

export default App;

const app = new App();