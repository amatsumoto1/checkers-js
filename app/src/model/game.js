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

    bindToMoveExecuted(callback) {
        this.onMoveExecuted = callback;
    } 

    bindToStateUpdated(callback) {
        this.onStateUpdated = callback;
    }

    start() {
        this.state = Game.State.PLAYING;
        this.board.initBoardPieces();
    }

    executeMove(move) {
        this.board.executeMove(move);
        this.updateState();
        this.moves.push(move);
        if (this.onMoveExecuted != null) {
            this.onMoveExecuted(move);
        }
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

        if (this.onStateUpdated != null) {
            this.onStateUpdated(this.state);
        }
    }

    
}

export default Game;