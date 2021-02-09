class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    isInBounds() {
        return this.row >= 0 && this.row <= 7 && this.col >= 0 && this.col <= 7;
    }

    static GetMidPosition(start, end) {
        return new Position((end.row - start.row)/2, (end.col - start.col)/2);
    }
}

export default Position;