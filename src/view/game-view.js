import BoardView from "./board-view.js";

class GameView {
    constructor() {
        this.board = new BoardView();
    }


    bindToRedoButtonPressed(callback) {
        document.getElementById("redo-button").onclick = callback;
    }

    bindToUndoButtonPressed(callback) {
        document.getElementById("undo-button").onclick = callback;
    }

    bindToResetButtonPressed(callback) {
        document.getElementById("new-game-button").onclick = callback;
    }

    setGameStarted() {
        this.board.enable();
    }

    setGameEnded() {
        this.board.disable();
    }
}

export default GameView;