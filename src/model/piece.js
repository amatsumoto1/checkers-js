class Piece {
    constructor(id, color, position, isKing = false) {
        this.id = id;
        this.color = color;
        this.position = position;
        this.isKing = isKing;
        this.moveAllowed = false;
    }

    canMoveUp() {
        return this.color == "black" || this.isKing;
    }

    canMoveDown() {
        return this.color == "red" || this.isKing;
    }
}

export default Piece;