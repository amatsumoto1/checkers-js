import Board from "../model/board.js";
import BoardView from "../view/boardview.js";

class GameController {
    self = this;
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.selectedPiece = null;
        this.bindToModel();
        this.bindToView();
    }

    bindToModel() {
        this.model.bindToMoveExecuted(this.onMoveExecuted);
        this.model.board.bindToPieceCanMove(this.onPieceActivated);
        this.model.board.bindToPieceCannotMove(this.onPieceDeactivated);
    }

    bindToView() {
        this.view.boardView.bindToPieceSelected(this.handlePieceSelected);
        this.view.boardView.bindToTileSelected(this.handleTileSelected);
    }

    handlePieceSelected(id) {
        self.selectedPiece = self.model.board.currentPieces.filter(piece => piece.id == id);
        self.view.resetTilesValid();
        if (self.selectedPiece != null) {
            if (self.model.board.validMoves.has(self.selectedPiece)) {
                for (let move of self.model.board.validMoves[self.selectedPiece]) {
                    self.view.setTileValid(move.end.row, move.end.col);
                }
            }
        }
    }
    handleTileSelected(row, col) {

    }

    onPieceDeactivated(piece) {
        this.view.setPieceInvalid(piece);
    }

    onPieceActivated(piece) {
        this.view.setPieceValid(piece);
    }

    onMoveExecuted(move) {

    }
}

export default GameController;