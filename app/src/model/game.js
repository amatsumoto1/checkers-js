import Board from "./board.js";
import Move from "./move.js";
import Piece from "./piece.js";
import Position from "./position.js";

class Game {
    static State = {
        NOT_STARTED: 0,
        PLAYING: 1,
        FINISHED: 2
    };

    constructor() {
        this.board = new Board();
        this.state = Game.State.NOT_STARTED;
        this.winner = null;
        this.moves = [];
        this.start();
    }

    get activePlayer() {
        return this.board.activePlayer;
    }

    start() {
        this.state = Game.State.PLAYING;
        this.board.initBoardPieces();
    }

    updateState() {
        if (this.board.activeRedPieces.length == 0) {
            this.state = Game.State.FINISHED;
            this.winner = "black";
        }

        if (this.board.activeBlackPieces.length == 0) {
            this.state = Game.State.FINISHED;
            this.winner = "red";
        }
    }

    getValidPieces() {
        let set = new Set();
        for (let move of this.board.possibleMoves) {

        }
    }
}

export default Game;