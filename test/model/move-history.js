import { expect } from "chai";
import { MoveHistory } from "../../src/model/move-history.js";
import Move from "../../src/model/move.js";
import Piece from "../../src/model/piece.js";
import Position from "../../src/model/position.js";

describe ("move history", function() {

    it("should initialize", function() {
        const moves = new MoveHistory();

        expect(moves.history).to.be.empty;
        expect(moves.undoneMoves).to.be.empty;
        expect(moves.canUndoMove()).to.be.false;
        expect(moves.canRedoMove()).to.be.false;
    });

    it("should store moves executed.", function() {
        const moves = new MoveHistory();
        const start = new Position(0, 0);
        const end = new Position(1, 1);
        const piece = new Piece("id1", "black", start);
        const move = new Move(piece, start, end);
        moves.addMove(move);

        expect(moves.history).to.have.length(1);
        expect(moves.canUndoMove()).to.be.true;
        expect(moves.undoneMoves).to.be.empty;
        expect(moves.canRedoMove()).to.be.false;
        expect(moves.peekMoveToUndo()).to.equal(move);
    });

    it("should handle the move to undo", function() {
        const moves = new MoveHistory();
        const start = new Position(0, 0);
        const end = new Position(1, 1);
        const piece = new Piece("id1", "black", start);
        const move = new Move(piece, start, end);
        moves.addMove(move);
        const undoneMove = moves.getMoveToUndo();

        expect(moves.history).to.be.empty;
        expect(moves.canUndoMove()).to.be.false;
        expect(moves.undoneMoves).to.have.length(1);
        expect(moves.canRedoMove()).to.be.true;
    });
});