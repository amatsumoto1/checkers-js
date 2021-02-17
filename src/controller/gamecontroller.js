import Board from "../model/board.js";
import Game from "../model/game.js";
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
        this.view.bindToResetButtonPressed(this.reset.bind(this));
        this.view.bindToUndoButtonPressed(this.undo.bind(this));
        this.view.bindToRedoButtonPressed(this.redo.bind(this));
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
        if (this.model.state == Game.State.FINISHED) {
            this.view.setGameEnded(this.model.winner);
        }
    }

    updateMoveablePieces() {
        this.view.board.resetMoveablePieces();
        const moveablePieces = this.model.board.validMoves.getMoveablePieces();
        for (let piece of moveablePieces) {
            this.view.board.setPieceMoveable(piece.id);
        }
    }

    reset() {
        this.model.reset();
        this.view.board.clearBoard();
        this.drawBoardPieces();
        this.view.board.resetValidTiles();
        this.view.board.bindToOnPieceSelected(this.handlePieceSelect.bind(this));
        this.updateMoveablePieces();
        this.selectedPiece = null;
        this.view.board.resetSelectedPieces();
        this.view.setGameStarted();
    }

    undo() {
        const move = this.model.history.peekMoveToUndo();
        if (move != null) {
            if (move.takenPiece != null) {
                this.view.board.addPiece(move.takenPiece.id, move.takenPiece.color, 
                    move.takenPiece.position.row, move.takenPiece.position.col);
            }
            this.model.undoMove();
            if (move.pieceKinged) {
                this.view.board.setPieceUnkinged(move.piece.id);
            }
            this.view.board.movePiece(move.piece.id, move.start.row, move.start.col);
            this.updateMoveablePieces();
            this.selectedPiece = null;
            this.view.board.resetSelectedPieces();
            if (this.model.state == Game.State.PLAYING) {
                this.view.setGameStarted();
            }
        }
    }

    redo() {
        const redoneMove = this.model.history.getMoveToRedo();
        if (redoneMove != null) {
            this.doMove(redoneMove, true);
            this.view.board.resetValidTiles();
            this.selectedPiece = null;
    
            if (this.model.board.activeColor == redoneMove.piece.color) {
                const nextPosition = this.model.board.validMoves.getEndPositions(redoneMove.piece)[0];
                this.view.board.setTileValid(nextPosition.row, nextPosition.col);
            }
            else {
                this.view.board.resetSelectedPieces();
            }
            this.updateMoveablePieces();
            if (this.model.state == Game.State.FINISHED) {
                this.view.setGameEnded(this.model.winner);
            }
        }
    }

    doMove(move, isRedo = false) {
        this.model.executeMove(move, isRedo);
        this.view.board.movePiece(move.piece.id, move.end.row, move.end.col);
        if (move.takenPiece != null) {
            this.view.board.removePiece(move.takenPiece.id);
        }
        if (move.pieceKinged) {
            this.view.board.setPieceKinged(move.piece.id);
        }
    }
}

export default GameController;