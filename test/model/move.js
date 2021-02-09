import { expect } from "chai";
import Move from "../../app/src/model/move.js";
import Piece from "../../app/src/model/piece.js";
import Position from "../../app/src/model/position.js";

describe("move", function() {

    it("should initialize", function() {
        const startPosition = new Position(0, 0);
        const jumpedPosition = new Position(1, 1);
        const endPosition = new Position(2, 2);
        const piece = new Piece("id1", "black", startPosition);
        const takenPiece = new Piece("id2", "red", jumpedPosition);
        const move = new Move(piece, startPosition, endPosition, takenPiece);

        expect(move).to.have.property("piece", piece);
        expect(move).to.have.property("start", startPosition);
        expect(move).to.have.property("end", endPosition);
        expect(move).to.have.property("takenPiece", takenPiece);
        expect(move).to.have.property("pieceKinged", false);
    });

    it("should know whether moved piece becomes kinged", function() {
        const blackPiece = new Piece("id1", "black", new Position(6, 6));
        const redPiece = new Piece("id2", "red", new Position(1, 1));
        const kingPiece = new Piece("id3", "black", new Position(6, 2));

        const move1 = new Move(blackPiece, new Position(6, 6), new Position(7, 5));
        expect(move1.pieceKinged).to.be.true;

        const move2 = new Move(redPiece, new Position(1, 1), new Position(0, 2));
        expect(move2.pieceKinged).to.be.true;

        const move3 = new Move(kingPiece, new Position(6, 6), new Position(7, 5));
        expect(move3.pieceKinged).to.be.false;
    });
});