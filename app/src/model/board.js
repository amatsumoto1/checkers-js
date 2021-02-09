import Piece from "./piece.js";
import Move from "./move.js";

class Board {
    constructor() {
        this.board = Array(8).fill(Array(8));
        this.activePlayer = 'red';
        this.activePieces = new {
            white : [],
            black : []
        }
        this.capturedPieces = new {
            white : [],
            black : []
        }
    }
}

export default Board;