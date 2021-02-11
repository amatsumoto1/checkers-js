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
        this.possibleMoves = new Map();

        for (let i = 0; i < 8; i++) {
            this.tiles[i] = new Array(8).fill(null);
        }
    }

    get currentPieces() {
        return this.activePlayer == "red" ? this.activeRedPieces : this.activeBlackPieces;
    }

    bindToPieceCanMove(callback) {
        this.onPieceCanMove = callback;
    }

    bindToPieceCannotMove(callback) {
        this.onPieceCannotMove = callback;
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

        this.getAllPossibleMoves();
    }

    executeMove(move) {
        this.movePiece(move.piece, move.end);
        if (move.pieceKinged) {
            move.piece.isKing = true;
        }
        if (move.takenPiece != null) {
            this.removePiece(move.takenPiece);
            let nextMoves = this.getJumpMoves(move.piece);
            if (nextMoves.length != 0) {
                this.possibleMoves.clear()
                this.possibleMoves.set(move.piece, nextMoves);
            }
            else {
                this.switchPlayerTurn();
            }
        }
        else {
            this.switchPlayerTurn();
        }
    }

    setPossibleMoves(moves) {
        this.possibleMoves.clear();
        for (let move of moves) {
            if (this.possibleMoves.has(move.piece)) {
                this.possibleMoves.get(move.piece).push(move);
            }
            else {
                this.possibleMoves.set(move.piece, [move]);
            }
        }
    }

    getAllPossibleMoves() {
        let jumpMoves = [];
        let slideMoves = [];

        for (let piece of this.currentPieces) {
            jumpMoves.push(...this.getJumpMoves(piece));
            slideMoves.push(...this.getSlideMoves(piece));
        }

        if (jumpMoves.length != 0) {
            this.setPossibleMoves(jumpMoves);
        }
        else {
            this.setPossibleMoves(slideMoves);
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
        for (let piece of this.currentPieces) {
            piece.moveAllowed = false;
        }
        this.activePlayer = this.activePlayer == "red" ? "black" : "red";
        this.getAllPossibleMoves();
    }

    hasPiece(position) {
        return this.tiles[position.row][position.col] != null;
    }

    getPiece(position) {
        return this.tiles[position.row][position.col];
    }

    movePiece(piece, position) {
        this.tiles[piece.position.row][piece.position.col] = null;
        this.tiles[position.row][position.col] = piece;
        piece.position = position;
    }

    removePiece(piece) {
        this.tiles[piece.position.row][piece.position.col] = null;
        if (piece.color == 'black') {
            let index = this.activeBlackPieces.indexOf(piece);
            this.activeBlackPieces.splice(index, 1);
            this.capturedBlackPieces.push(piece);
        }
        else {
            let index = this.activeRedPieces.indexOf(piece);
            this.activeRedPieces.splice(index, 1);
            this.capturedBlackPieces.push(piece);
        }
    }
}

export default Board;