import Piece from "./piece.js";
import Move from "./move.js";
import Position from "./position.js";
import {ValidMoves} from "./valid-moves.js";

/**
 * Chess board for the game.
 */
class Board {
    constructor() {
        this.tiles = new Array(8);
        for (let i = 0; i < 8; i++) {
            this.tiles[i] = new Array(8).fill(null);
        }
        this.pieces = [];
        this.validMoves = new ValidMoves();
        this.activeColor = "red";
    }

    /**
     * Initializes the board game pieces.
     */
    init() {
        // Initialize all the black pieces.
        for (let i = 0; i < 12; i++) {
            const row = Math.floor(i / 4);
            const col = (2*(i % 4)) + ((row % 2 == 0) ? 0 : 1);
            const blackPiece = new Piece("black-piece" + i, "black", new Position(row, col));
            this.addPiece(blackPiece);
        }

        // Initialize all the white pieces.
        for (let i = 0; i < 12; i++) {
            const row = 5 + Math.floor(i / 4);
            const col = (2*(i % 4)) + ((row % 2 == 0) ? 0 : 1);
            const whitePiece = new Piece("red-piece" + i, "red", new Position(row, col));
            this.addPiece(whitePiece);
        }
    }

    /**
     * Gets all the pieces for the given color.
     * 
     * @param {String} color The color to get the pieces for.
     * @returns {Array<Piece>} The pieces for the given color.
     */
    getPieces(color) {
        return this.pieces.filter(piece => piece.color == color);
    }

    /**
     * Gets the piece with the given id.
     * @param {String} id The id of the piece to find.
     * @returns {Piece} The piece with the given id. 
     */
    getPieceFromId(id) {
        return this.pieces.find(piece => piece.id == id);
    }

    reset() {
        for (let piece of this.pieces) {
            this.tiles[piece.position.row][piece.position.col] = null;
        }
        this.pieces = [];
        this.validMoves.clear();
        this.activeColor = "red";
        this.init();
    }

    /**
     * Executed the given move.
     * 
     * @param {Move} move The move the execute.
     */
    executeMove(move) {
        this.movePiece(move.piece, move.end);
        if (move.pieceKinged) {
            move.piece.isKing = true;
        }
        if (move.takenPiece) {
            this.removePiece(move.takenPiece);
            const nextMoves = this.getJumpMoves(move.piece);
            if (nextMoves.length > 0) {
                this.validMoves.setMoves(nextMoves);
            }
            else {
                this.switchTurns();
            }
        }
        else {
            this.switchTurns();
        }
    }

    undoMove(move, switchTurn = true) {
        this.movePiece(move.piece, move.start);
        if (move.pieceKinged) {
            move.piece.isKing = false;
        }

        if (move.takenPiece) {
            this.addPiece(move.takenPiece);
        }

        if (switchTurn) {
            this.switchTurns();
        }
        else {
            const nextMoves = this.getJumpMoves(move.piece);
            this.validMoves.setMoves(nextMoves);
        }
    }

    addPiece(piece) {
        this.pieces.push(piece);
        this.tiles[piece.position.row][piece.position.col] = piece;
    }

    removePiece(piece) {
        const index = this.pieces.indexOf(piece);
        this.pieces.splice(index, 1);
        this.tiles[piece.position.row][piece.position.col] = null;
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

    getAllPossibleMoves() {
        let jumpMoves = [];
        let slideMoves = [];

        const activePieces = this.getPieces(this.activeColor);
        for (let piece of activePieces) {
            jumpMoves.push(...this.getJumpMoves(piece));
            slideMoves.push(...this.getSlideMoves(piece));
        }

        if (jumpMoves.length) {
            this.validMoves.setMoves(jumpMoves);
        }
        else {
            this.validMoves.setMoves(slideMoves);
        }
    }

    getJumpMoves(piece) {
        const offsets = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        const moves = [];
        for (const offset of offsets) {
            const jumpPosition = new Position(piece.position.row + offset[0], piece.position.col + offset[1]);
            const endPosition = new Position(piece.position.row + 2*offset[0], piece.position.col + 2*offset[1]);
            if (this.isJumpMoveValid(piece, jumpPosition, endPosition)) {
                const takenPiece = this.getPiece(jumpPosition);
                moves.push(new Move(piece, piece.position, endPosition, takenPiece));
            }
        }

        return moves;
    }


    getSlideMoves(piece) {
        const offsets = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        const moves = [];
        for (const offset of offsets) {
            const end = new Position(piece.position.row + offset[0], piece.position.col + offset[1]);
            if (this.isSlideMoveValid(piece, end)) {
                moves.push(new Move(piece, piece.position, end));
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
            || this.getPiece(jumpedPosition).color === piece.color) {
            return false;
        }

        return !this.hasPiece(endPosition);
    }

    switchTurns() {
        this.activeColor = this.activeColor === "red" ? "black" : "red";
        this.getAllPossibleMoves();
    }
}

export default Board;