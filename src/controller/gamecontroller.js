import Board from "../model/board.js";
import Position from "../model/position.js";
import BoardView from "../view/board-view.js";

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.selectedPiece = null;
        this.model.start();
        this.bindToView();
    }

    bindToView() {
        this.drawBoardPieces();
        this.view.board.bindToOnPieceSelected(this.handlePieceSelect.bind(this));
        this.view.board.bindToOnTileSelected(this.handleTileSelected.bind(this));
        this.updateMoveablePieces();
    }

    drawBoardPieces() {
        for (let piece of this.model.board.pieces) {
            this.view.board.addPiece(piece.id, piece.color, piece.position.row, piece.position.col);
        }
    }

    handlePieceSelect(id) {
        this.selectedPiece = this.model.board.getPieceFromId(id);
        this.view.board.resetValidTiles();
        this.view.board.resetSelectedPieces();
        const moveablePos = this.model.board.validMoves.getEndPositions(this.selectedPiece);
        for (let pos of moveablePos) {
            this.view.board.setTileValid(pos.row, pos.col);
        }
    }

    handleTileSelected(row, col) {
        const selectedPos = new Position(row, col);
        if (this.selectedPiece != null) {
            const move = this.model.board.validMoves.getMove(this.selectedPiece, selectedPos);
            if (move != null) {
                this.model.executeMove(move);
                this.view.board.movePiece(move.piece.id, row, col);
                if (move.takenPiece != null) {
                    this.view.board.removePiece(move.takenPiece.id);
                }
                if (move.pieceKinged) {
                    this.view.board.setPieceKinged(move.piece.id);
                }
            }

            this.view.board.resetValidTiles();
            if (move != null && this.selectedPiece.color == this.model.board.activeColor) {
                const nextPosition = this.model.board.validMoves.getEndPositions(this.selectedPiece)[0];
                this.view.board.setTileValid(nextPosition.row, nextPosition.col);
            }
            else {
                this.selectedPiece = null;
                this.view.board.resetSelectedPieces();
            }
        }
        else {
            this.view.board.resetSelectedPieces();
            this.view.board.resetValidTiles();
        }
        this.updateMoveablePieces();
    }

    updateMoveablePieces() {
        this.view.board.resetMoveablePieces();
        const moveablePieces = this.model.board.validMoves.getMoveablePieces();
        for (let piece of moveablePieces) {
            this.view.board.setPieceMoveable(piece.id);
        }
    }
}

export default GameController;