class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    isInBounds() {
        return this.row >= 0 && this.row <= 7 && this.col >= 0 && this.col <= 7;
    }

    equals(position) {
        return this.row === position.row && this.col === position.col;
    }
}

export default Position;