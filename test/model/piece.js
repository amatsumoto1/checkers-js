import { expect } from "chai";
import Piece from "../../src/model/piece.js";
import Position from "../../src/model/position.js";

describe("piece", function() {

    it("should initialize", function() {
        const position = new Position(0, 0);
        const piece = new Piece("p1", "black", position) ;

        expect(piece).to.have.property("id", "p1");
        expect(piece).to.have.property("color", "black");
        expect(piece).to.have.property("position", position);
        expect(piece).to.have.property("isKing", false);
    });

    it("should know if it can move upwards", function() {
        const position = new Position(1, 1);
        
        const blackPiece = new Piece("p1", "black", position);
        expect(blackPiece.canMoveUp()).to.be.true;

        const redPiece = new Piece("p2", "red", position);
        expect(redPiece.canMoveUp()).to.be.false;

        const redKingPiece = new Piece("p3", "red", position, true);
        expect(redKingPiece.canMoveUp()).to.be.true;
    });

    it("should know if it can move downward", function() {
        const position = new Position(1, 1);
        
        const blackPiece = new Piece("p1", "black", position);
        expect(blackPiece.canMoveDown()).to.be.false;

        const redPiece = new Piece("p2", "red", position);
        expect(redPiece.canMoveDown()).to.be.true;

        const blackKingPiece = new Piece("p3", "black", position, true);
        expect(blackKingPiece.canMoveUp()).to.be.true;
    });
});