import BoardView from "./board-view.js";

class GameView {
    constructor() {
        this.board = new BoardView();
        this.textCtx = document.getElementById("winner-text");
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
        this.textCtx.innerText = "";
    }

    setGameEnded(winner) {
        this.board.disable();
        this.textCtx.innerText = winner.toUpperCase() + " WINS!";
    }
}

export default GameView;