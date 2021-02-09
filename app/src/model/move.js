class Move {

    constructor(piece, start, end, isKinged=false, takenPiece=null) {
        this.piece = piece;
        this.start = start;
        this.end = end;
        this.isKinged = false;
        this.takenPiece = takenPiece;
    }
}

export default Move;