import BoardView from "./board-view.js";

class GameView {
    constructor() {
        this.board = new BoardView();
        this.onRedoButtonPressed = function() {};
        this.onUndoButtonPressed = function() {};
        this.onResetButtonPressed = function() {};
    }


}

export default GameView;