import Piece from "./piece.js";
import Move from "./move.js";
import Position from "./position.js";

class Board {
    constructor() {
        this.board = Array(8).fill(Array(8));
        this.activePlayer = 'red';
        this.activeRedPieces = [];
        this.activeBlackPieces = [];
        this.capturedRedPieces = [];
        this.capturedBlackPieces = [];
        this.possibleMoves = [];
    }

    initBoardPieces() {
        for (let i = 0; i < 12; i++) {
            let row = Math.floor(i / 8);
            let col = i % 8;
            let position = new Position(row, col);
            let blackPiece = new Piece("black-piece" + i, "black", position);
            this.activeBlackPieces.push(blackPiece);
            this.board[row][col] = blackPiece;
        }

        for (let i = 0; i < 12; i++) {
            const row = 5 + Math.floor(i / 8);
            const col = i % 8;
            let position = new Position(row, col);
            let redPiece = new Piece("red-piece" + i, "red", position);
            this.activeRedPieces.push(redPiece);
            this.board[row][col] = redPiece;
        }
    }

    executeMove(move) {
        this.board[move.startPosition.row][move.startPosition.col] = null;
        this.board[move.endPosition.row][move.endPosition.col] = move.piece;
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
        for (offset of offsets) {
            let endPosition = new Position(piece.position.row + offset[0], piece.position.col + offset[0]);
            if (this.isSlideMoveValid(piece, endPosition)) {
                moves.push(new Move(piece, piece.position, endPosition));
            }
        }

        return moves;
    }

    getJumpMoves(piece) {
        const offsets = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        let moves = [];
        for (offset of offsets) {
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
        if (!endPosition.isInBound()) {
            return false;
        }
        if ((endPosition.col > piece.col && !piece.canMoveUp())
            || (endPosition.col < piece.col && !piece.canMoveDown())) {
            return false;
        }
        return !this.hasPiece(endPosition);
    }

    isJumpMoveValid(piece, jumpedPosition, endPosition) {
        if (!endPosition.isInBound()) {
            return false;
        }

        if ((endPosition.col > piece.col && !piece.canMoveUp())
            || (endPosition.col < piece.col && !piece.canMoveDown())) {
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
        return this.board[position.row][position.col] != null;
    }

    getPiece(position) {
        return this.board[position.row][position.col];
    }

    removePiece(piece) {
        this.board[piece.position.row][piece.position.col] = null;
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