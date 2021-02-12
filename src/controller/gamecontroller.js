import Board from "../model/board.js";
import Position from "../model/position.js";
import BoardView from "../view/boardview.js";

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.selectedPiece = null;
        this.bindToModel();
        this.bindToView();
        this.model.start();
    }

    bindToModel() {
        this.model.bindToMoveExecuted(this.onMoveExecuted.bind(this));
        this.model.board.bindToPieceCanMove(this.onPieceActivated.bind(this));
        this.model.board.bindToPieceCannotMove(this.onPieceDeactivated.bind(this));
    }

    bindToView() {
        this.view.boardView.bindToPieceSelected(this.handlePieceSelected.bind(this));
        this.view.boardView.bindToTileSelected(this.handleTileSelected.bind(this));
        this.view.init();
    }

    handlePieceSelected(id) {
        this.selectedPiece = this.model.board.currentPieces.filter(piece => piece.id == id)[0];
        this.view.boardView.resetTilesValid();
        this.view.boardView.resetSelectedPieces();
        if (this.selectedPiece != null) {
            this.view.boardView.setPieceSelected(this.selectedPiece);
            if (this.model.board.possibleMoves.has(this.selectedPiece)) {
                for (let move of this.model.board.possibleMoves.get(this.selectedPiece)) {
                    this.view.boardView.setTileValid(move.end.row, move.end.col);
                }
            }
        }
    }

    handleTileSelected(row, col) {
        let tilePosition = new Position(row, col);
        if (this.selectedPiece != null) {
            if (this.model.board.possibleMoves.has(this.selectedPiece)) {
                let selectedPieceMoves = this.model.board.possibleMoves.get(this.selectedPiece);
                let selectedMove = selectedPieceMoves.filter(move => move.end.equals(tilePosition))[0];
                if (selectedMove != null) {
                    this.model.executeMove(selectedMove);
                }
                this.view.boardView.resetTilesValid();
                if (this.model.activePlayer != this.selectedPiece.color) {
                    this.selectedPiece = null;
                    this.view.boardView.resetSelectedPieces();
                }
                else {
                    let nextPosition = this.model.board.possibleMoves.get(this.selectedPiece)[0].end;
                    this.view.boardView.setTileValid(nextPosition.row, nextPosition.col);
                }
                
            }
        }
        else {
            this.view.boardView.resetSelectedPieces();
            this.view.boardView.resetTilesValid();
        }
    }

    onPieceDeactivated(piece) {
        this.view.boardView.setPieceInvalid(piece);
    }

    onPieceActivated(piece) {
        this.view.boardView.setPieceValid(piece);
    }

    onMoveExecuted(move) {
        this.view.boardView.updatePiece(move.piece);
        if (move.takenPiece != null) {
            this.view.boardView.removePiece(move.takenPiece);
        }
        if (move.pieceKinged) {
            this.view.boardView.kingPiece(move.piece);
        }
    }
}

export default GameController;