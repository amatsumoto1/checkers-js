class BoardView {
    constructor() {
        this.ctx = document.getElementById("board");
        this.drawBoard();
    }

    drawBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let tile = document.createElement("div");
                tile.id = String.fromCharCode(65 + i) + (j + 1);
                tile.className = "board-tile ";
                tile.className += (i % 2 == j % 2)? "red-tile" : "black-tile"; 
                this.ctx.appendChild(tile);
            }
        }
    }

    
    /*removePiece(piece) {

    }*/

    createPiece(piece) {
        let tile = getTile(piece.position.row, piece.position.col);
        let pieceCtx = this.ctx.createElement("div");
        pieceCtx.id = piece.id;
        pieceCtx.class = "board-piece ";
        pieceCtx.class += piece.color == "red" ? "red-piece" : "black-piece";
        if (piece.isKing) {
            pieceCtx.class += " kinged-piece";
        }
    }


    getTile(row, col) {
        let tileId = String.fromCharCode(65 + row) + (col + 1);
        return this.ctx.getElementById(tileId);
    }
}

export default BoardView;