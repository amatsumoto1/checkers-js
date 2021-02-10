import BoardView from "./boardview.js";

class GameView {
    constructor(model) {
        this.model = model;
        this.boardView = new BoardView(model.board);
        this.init();
    }

    init() {
        for (let piece of this.model.board.activeBlackPieces) {
            this.boardView.renderPiece(piece);
        }

        for (let piece of this.model.board.activeRedPieces) {
            this.boardView.renderPiece(piece);
        }

        this.updatePiecesToMove();
    }

    updatePiecesToMove() {
        for (let piece of this.model.board.currentPieces) {
            this.boardView.setPieceInvalid(piece);
            if (this.model.board.possibleMoves.has(piece)) {
                this.boardView.setPieceValid(piece);
            }
        }
    }
}

export default GameView;