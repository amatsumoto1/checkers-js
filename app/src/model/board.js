import Piece from "./piece.js";
import Move from "./move.js";
import Position from "./position.js";

class Board {
    constructor() {
        this.tiles = new Array(8);
        this.activePlayer = 'red';
        this.activeRedPieces = [];
        this.activeBlackPieces = [];
        this.capturedRedPieces = [];
        this.capturedBlackPieces = [];
        this.possibleMoves = [];

        for (let i = 0; i < 8; i++) {
            this.tiles[i] = new Array(8);
        }
    }

    initBoardPieces() {
        for (let i = 0; i < 12; i++) {
            let row = Math.floor(i / 4);
            let col = 2*(i % 4) + ((row % 2 == 0) ? 0 : 1);
            let position = new Position(row, col);
            let blackPiece = new Piece("black-piece" + i, "black", position);
            this.activeBlackPieces.push(blackPiece);
            this.tiles[row][col] = blackPiece;
        }

        for (let i = 0; i < 12; i++) {
            let row = 5 + Math.floor(i / 4);
            let col = 2*(i % 4) + ((row % 2 == 0) ? 0 : 1);
            let position = new Position(row, col);
            let redPiece = new Piece("red-piece" + i, "red", position);
            this.activeRedPieces.push(redPiece);
            this.tiles[row][col] = redPiece;
        }
    }

    executeMove(move) {
        this.tiles[move.startPosition.row][move.startPosition.col] = null;
        this.tiles[move.endPosition.row][move.endPosition.col] = move.piece;
        move.piece.position = move.endPosition;
        if (move.isKinged) {
            move.piece.isKing = true;
        }
        if (move.takenPiece != null) {
            this.removePiece(move.takenPiece);
            let nextMoves = this.getJumpMoves(move.piece);
            if (nextMoves.length != 0) {
                this.possibleMoves = nextMoves;
            }
            else {
                this.switchPlayerTurn();
            }
        }
        else {
            this.switchPlayerTurn();
        }
    }

    getAllPossibleMoves() {
        let currentPieces = this.activePieces == "red" ? this.activeRedPieces : this.activeBlackPieces;
        let jumpMoves = [];
        let slideMoves = [];

        for (piece of currentPieces) {
            jumpMoves.push(this.getJumpMoves(piece));
            slideMoves.push(this.getSlideMoves(piece));
        }

        if (jumpMoves.length != 0) {
            this.possibleMoves = jumpMoves;
        }
        else {
            this.possibleMoves = slideMoves;
        }
    }

    getSlideMoves(piece) {
        const offsets = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        let moves = [];
        for (let offset of offsets) {
            let endPosition = new Position(piece.position.row + offset[0], piece.position.col + offset[1]);
            if (this.isSlideMoveValid(piece, endPosition)) {
                moves.push(new Move(piece, piece.position, endPosition));
            }
        }

        return moves;
    }

    getJumpMoves(piece) {
        const offsets = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        let moves = [];
        for (let offset of offsets) {
            let jumpPosition = new Position(piece.position.row + offset[0], piece.position.col + offset[1]);
            let endPosition = new Position(piece.position.row + 2*offset[0], piece.position.col + 2*offset[1]);
            if (this.isJumpMoveValid(piece, jumpPosition, endPosition)) {
                let takenPiece = this.getPiece(jumpPosition);
                moves.push(new Move(piece, piece.position, endPosition, takenPiece));
            }
        }

        return moves;
    }

    isSlideMoveValid(piece, endPosition) {
        if (!endPosition.isInBounds()) {
            return false;
        }
        if ((endPosition.row > piece.position.row && !piece.canMoveUp())
            || (endPosition.row < piece.position.row && !piece.canMoveDown())) {
            return false;
        }

        return !this.hasPiece(endPosition);
    }

    isJumpMoveValid(piece, jumpedPosition, endPosition) {
        if (!endPosition.isInBounds()) {
            return false;
        }

        if ((endPosition.row > piece.position.row && !piece.canMoveUp())
            || (endPosition.row < piece.position.row && !piece.canMoveDown())) {
            return false;
        }

        if (!this.hasPiece(jumpedPosition)
            || this.getPiece(jumpedPosition).color == piece.color) {
            return false;
        }

        return !this.hasPiece(endPosition);
    }

    switchPlayerTurn() {
        this.activePlayer = this.activePlayer == "red" ? "black" : "red";
        this.getAllPossibleMoves();
    }

    hasPiece(position) {
        return this.tiles[position.row][position.col] != null;
    }

    getPiece(position) {
        return this.tiles[position.row][position.col];
    }

    removePiece(piece) {
        this.tiles[piece.position.row][piece.position.col] = null;
        if (piece.color == 'black') {
            let index = this.activeBlackPieces.indexOf(piece);
            this.activeBlackPieces.splice(index);
            this.capturedBlackPieces.push(piece);
        }
        else {
            let index = this.activeRedPieces.indexOf(piece);
            this.activeRedPieces.splice(index);
            this.capturedBlackPieces.push(piece);
        }
    }
}

export default Board;