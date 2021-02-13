import { expect } from "chai";
import Board from "../../src/model/board.js";
import Move from "../../src/model/move.js";
import Piece from "../../src/model/piece.js";
import Position from "../../src/model/position.js";

describe("board", function() {
    it("should initialize", function() {
        const board = new Board();
        expect(board.tiles).to.have.length(8);
        board.tiles.forEach(function(row) { 
            expect(row).to.have.length(8);
        });
        expect(board).to.have.property("activeColor", "red");
    });

    it ("should correctly set up pieces", function() {
        const board = new Board();
        board.init();
        expect(board.pieces).to.have.length(24);
        for (let i = 0; i < 12; i++) {
            const row = Math.floor(i/4);
            const col = 2*(i % 4) + ((row % 2 == 0) ? 0 : 1);
            const piece = board.tiles[row][col];
            expect(piece).to.not.be.null;
            expect(piece.color).to.equal("black");
            expect(piece.position.equals(new Position(row, col))).to.be.true;
            expect(board.pieces).to.contains(piece);
        }

        for (let i = 0; i < 12; i++) {
            const row = 5 + Math.floor(i/4);
            const col = 2*(i % 4) + ((row % 2 == 0) ? 0 : 1);
            const piece = board.tiles[row][col];
            expect(piece).to.not.be.null;
            expect(piece.color).to.equal("red");
            expect(piece.position.equals(new Position(row, col))).to.be.true;
            expect(board.pieces).to.contains(piece);
        }        
    });

    it("should determine valid slide moves for non-king pieces", function() {
        const board = new Board();
        const position = new Position(6, 6);
        const piece = new Piece("red-piece0", "red", position);
        board.addPiece(piece);
        const slideMoves = board.getSlideMoves(piece);
        expect(slideMoves).to.have.length(2);
        expect(slideMoves).to.deep.include(new Move(piece, position, new Position(5, 5)));
        expect(slideMoves).to.deep.include(new Move(piece, position, new Position(5, 7)));

        // Check obstructed piece.
        const piece2 = new Piece("black-piece0", "black", new Position(5, 5));
        board.addPiece(piece2);
        const blackSlideMoves = board.getSlideMoves(piece2);
        expect(blackSlideMoves).to.have.length(1);
        expect(blackSlideMoves).to.deep.include(new Move(piece2, new Position(5, 5), new Position(6, 4)));
    });
});