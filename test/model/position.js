import { expect } from "chai";
import Position from "../../src/model/position.js";

describe("position", function() {

    it("should initialize", function() {
        const position = new Position(2, 3);

        expect(position).to.have.property("row", 2);
        expect(position).to.have.property("col", 3);
    });

    it("should know when it is in bounds", function() {
        const bottomLeft = new Position(0, 0);
        expect(bottomLeft.isInBounds()).to.be.true;

        const topRight = new Position(7, 7);
        expect(topRight.isInBounds()).to.be.true;
    });

    it("should know when it is not in bounds", function() {
        const rowTooSmall = new Position(-1, 0);
        expect(rowTooSmall.isInBounds()).to.be.false;

        const rowTooLarge = new Position(8, 6);
        expect(rowTooLarge.isInBounds()).to.be.false;

        const colTooSmall = new Position(0, -1);
        expect(colTooSmall.isInBounds()).to.be.false;

        const colTooLarge = new Position(4, 8);
        expect(colTooLarge.isInBounds()).to.be.false;
    });
});