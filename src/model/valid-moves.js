/**
 * Container class for valid moves of a board state.
 */
export class ValidMoves {
    constructor() {
        this.moves = new Map();
    }

    /**
     * @returns {array<Move>} The moveable pieces for the board state.
     */
    getMoveablePieces() {
        return this.moves.keys();
    }

    isPieceMoveable(piece) {
        return this.moves.has(piece);
    }

    /**
     * Gets the end positions that the piece can move to. 
     * 
     * @param {Piece} piece The piece to get end positions for. 
     * @returns {array<Position>} The end positions the piece can move to.
     */
    getEndPositions(piece) {
        if (!this.moves.has(piece)) {
            return [];
        }

        return this.moves.get(piece).map(move => move.end);
    }

    /**
     * Returns the move for the piece with the end position.
     * 
     * @param {Piece} piece The piece to get the move for.
     * @param {Position} endPosition The end position for the move.
     * @returns {Move} The move with the given piece and end position.
     */
    getMove(piece, endPosition) {
        const move = this.moves.get(piece).find(move => move.end.equals(endPosition));
        if (move == undefined) {
            return null;
        }

        return move;
    }

    clear() {
        this.moves.clear();
    }

    /**
     * Sets the collection of valid moves.
     * 
     * @param {Array<Move>} moves Valid moves for this piece.
     */
    setMoves(moves) {
        this.clear();
        for (let move of moves) {
            if (!this.moves.has(move.piece)) {
                this.moves.set(move.piece, [move]);
            }
            else {
                this.moves.get(move.piece).push(move);
            }
        }
    }
}