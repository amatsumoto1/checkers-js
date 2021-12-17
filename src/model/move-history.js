export class MoveHistory {
    constructor() {
        this.history = [];
        this.undoneMoves = [];
    }

    addMove(move, clearMoves=true) {
        if (clearMoves) {
            this.undoneMoves = [];
        }
        this.history.push(move);
    }

    canUndoMove() {
        return !!this.history.length;
    }

    peekMoveToUndo() {
        if (!this.history.length) {
            return null;
        }

        return this.history[this.history.length - 1];
    }

    getMoveToUndo() {
        if (!this.history.length) {
            return null;
        }

        const move = this.history.pop();
        this.undoneMoves.push(move);
        return move;
    }

    canRedoMove() {
        return this.undoneMoves.length != 0;
    }

    getMoveToRedo() {
        if (this.undoneMoves.length == 0) {
            return null;
        }

        return this.undoneMoves.pop();
    }

    reset() {
        this.history = [];
        this.undoneMoves = [];
    }

}