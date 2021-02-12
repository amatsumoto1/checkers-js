import BoardView from "./boardview.js";

class GameView {
    constructor(model) {
        this.model = model;
        this.boardView = new BoardView(model.board);
    }

    init() {
        for (let piece of this.model.board.activeBlackPieces) {
            this.boardView.renderPiece(piece);
        }

        for (let piece of this.model.board.activeRedPieces) {
            this.boardView.renderPiece(piece);
        }
    }
}

export default GameView;