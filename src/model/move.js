class Move {

    constructor(piece, start, end, takenPiece=null) {
        this.piece = piece;
        this.start = start;
        this.end = end;
        this.pieceKinged = this.checkIfKinged();
        this.takenPiece = takenPiece;
    }

    checkIfKinged() {
        return (   this.piece.canMoveUp()   && !this.piece.isKing && this.end.row === 7)
               || (this.piece.canMoveDown() && !this.piece.isKing && this.end.row === 0);
    }
}

export default Move;