import { expect } from "chai";
import Board from "../../src/model/board.js";
import Move from "../../src/model/move.js";
import Piece from "../../src/model/piece.js";
import Position from "../../src/model/position.js";

describe("board", function() {
    it("should initialize", function() {
        const board = new Board();
        expect(board).to.have.property("activePlayer", "red");
        expect(board.tiles).to.have.length(8);
        board.tiles.forEach(function(row) { 
            expect(row).to.have.length(8);
        });
        expect(board.activeBlackPieces).to.be.empty;
        expect(board.activeRedPieces).to.be.empty;
        expect(board.capturedRedPieces).to.be.empty;
        expect(board.capturedRedPieces).to.be.empty;
        expect(board.possibleMoves).to.be.empty;
    });

    it("should correctly set up black pieces", function() {
        const board = new Board();
        board.initBoardPieces();
        expect(board.activeBlackPieces).to.have.length(12);
        expect(board.capturedBlackPieces).to.be.empty;
        for (let i = 0; i < 12; i++) {
            const piece = board.activeBlackPieces[i];
            let row = Math.floor(i / 4);
            let col = 2*(i % 4) + ((row % 2 == 0) ? 0 : 1);
            expect(piece.position.row).to.be.equal(row);
            expect(piece.position.col).to.be.equal(col);
            expect(board.tiles[row][col]).to.equal(piece);
        }
    });

    it("should correctly set up red pieces", function() {
        const board = new Board();
        board.initBoardPieces();
        expect(board.activeRedPieces).to.have.length(12);
        expect(board.capturedRedPieces).to.be.empty;
        for (let i = 0; i < 12; i++) {
            const piece = board.activeRedPieces[i];
            let row = 5 + Math.floor(i / 4);
            let col = 2*(i % 4) + ((row % 2 == 0) ? 0 : 1);
            expect(piece.position.row).to.be.equal(row);
            expect(piece.position.col).to.be.equal(col);
            expect(board.tiles[row][col]).to.equal(piece);
        }
    });

    it("should determine valid slide moves for non-king pieces", function() {
        const board = new Board();
        const position = new Position(6, 6);
        const piece = new Piece("red-piece0", "red", position);
        board.tiles[6][6] = piece;
        const slideMoves = board.getSlideMoves(piece);
        expect(slideMoves).to.have.length(2);
        expect(slideMoves).to.deep.include(new Move(piece, position, new Position(5, 5)));
        expect(slideMoves).to.deep.include(new Move(piece, position, new Position(5, 7)));

        // Check obstructed piece.
        const piece2 = new Piece("black-piece0", "black", new Position(5, 5));
        board.tiles[5][5] = piece2;
        const blackSlideMoves = board.getSlideMoves(piece2);
        expect(blackSlideMoves).to.have.length(1);
        expect(blackSlideMoves).to.deep.include(new Move(piece2, new Position(5, 5), new Position(6, 4)));
    });
});