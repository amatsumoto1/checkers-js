class Move {

    constructor(piece, start, end, takenPiece=null) {
        this.piece = piece;
        this.start = start;
        this.end = end;
        this.pieceKinged = checkIfKinged();
        this.takenPiece = takenPiece;
    }

    checkIfKinged() {
        return (   this.piece.canMoveUp()   && !this.piece.isKinged && this.end.row == 7)
               || (this.piece.canMoveDown() && !this.piece.isKinged && this.end.row == 0);
    }
}

export default Move;