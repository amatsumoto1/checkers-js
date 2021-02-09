import BoardView from "./boardview.js";

class GameView {
    constructor(model) {
        this.boardView = new BoardView(model.board);
    }
}

export default GameView;