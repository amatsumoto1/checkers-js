import Board from "../model/board.js";

class BoardView {
    constructor() {
        this.drawBoard();
    }

    bindToPieceSelected(callback) {
        this.onPieceSelected = callback;
    }

    callPieceSelected(piece) {
        this.onPieceSelected(piece);
    }

    bindToTileSelected(callback) {
        this.onTileSelected = callback;
    }

    callTileSelected(row, col) {
        this.onTileSelected(row, col);
    }

    drawBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.renderTile(i, j);
            }
        }
    }

    renderTile(row, col) {
        let tileId = String.fromCharCode(65 + row) + (col + 1);
        let tile = document.createElement("div");
        tile.id = tileId;
        document.getElementById("board").appendChild(tile);
        tile.classList.add("board-tile");
        tile.classList.add(row % 2 == col % 2 ? "red-tile" : "black-tile");
        var self = this;
        tile.onclick = function() {self.callTileSelected(row, col)};
    }

    renderPiece(piece) {
        let pieceCtx = document.createElement("div");
        pieceCtx.id = piece.id;
        let tile = this.getTileElement(piece.position.row, piece.position.col);
        tile.appendChild(pieceCtx);
        pieceCtx.classList.add("board-piece");
        pieceCtx.classList.add(piece.color + "-piece");
        if (piece.isKing) {
            pieceCtx.classList.addClass("king");
        }

        var self = this;
        pieceCtx.onclick = function() {self.callPieceSelected(piece.id)};
    }

    removePiece(piece) {
        document.getElementById(piece.id).remove();
    }

    setPieceValid(piece) {
        document.getElementById(piece.id).classList.add("legal");
    }

    setPieceInvalid(piece) {
        document.getElementById(piece.id).classList.remove("legal");
    }

    setTileValid(row, col) {
        this.getTileElement(row, col).addClass("valid");
    }

    resetTilesValid() {
        document.getElementsByClassName("valid").classList.remove("valid");
    }

    getTileElement(row, col) {
        let tileId = String.fromCharCode(65 + row) + (col + 1);
        return document.getElementById(tileId);
    }
}

export default BoardView;