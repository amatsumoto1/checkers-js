import Board from "./board.js";
import {MoveHistory} from "./move-history.js";
import Move from "./move.js";
import Piece from "./piece.js";
import Position from "./position.js";

/**
 * The instance of the game running.
 */
class Game {
    constructor() {
        this.board = new Board();
        this.history = new MoveHistory();
        this.state = Game.State.NOT_STARTED;
        this.winner = null;
    }

    /**
     * @enum The state of the game.
     */
    static State = {
        NOT_STARTED: 0,
        PLAYING: 1,
        FINISHED: 2,
    };

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
        this.board.init();
        this.board.getAllPossibleMoves();
    }

    reset() {
        //
    }

    executeMove(move) {
        this.board.executeMove(move);
        this.updateState();
        this.history.addMove(move);
    }

    undoMove() {
        if (this.history.canUndoMove()) {
            const move = this.history.getMoveToUndo();
            const switchTurns = !this.history.canUndoMove() ||
                this.history.peekMoveToUndo().piece.color != this.board.activeColor;
            this.board.undoMove(move, switchTurns);
            this.updateState();
        }
    }

    updateState() {
        if (this.board.getPieces("red").length == 0) {
            this.winner = "black";
            this.state = Game.State.FINISHED;
        }
        else if (this.board.getPieces("black").length == 0) {
            this.winner = "red";
            this.state = Game.State.FINISHED;
        }
    }

    
}

export default Game;