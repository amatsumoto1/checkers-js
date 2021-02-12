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
        let tile = this.getTileElement(row, col);
        if (!tile.hasChildNodes()) {
            this.onTileSelected(row, col);
        }
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
        tile.onclick = this.callTileSelected.bind(this, row, col);
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
        pieceCtx.onclick = this.callPieceSelected.bind(this, piece.id);
    }

    removePiece(piece) {
        document.getElementById(piece.id).remove();
    }

    setPieceValid(piece) {
        document.getElementById(piece.id).classList.add("legal-piece");
    }

    setPieceInvalid(piece) {
        document.getElementById(piece.id).classList.remove("legal-piece");
    }

    setPieceSelected(piece) {
        document.getElementById(piece.id).classList.add("selected");
    }

    resetSelectedPieces() {
        let validTiles = [].slice.call(document.getElementsByClassName("selected"));
        for (let validTile of validTiles) {
            validTile.classList.remove("selected");
        }
    }

    setTileValid(row, col) {
        this.getTileElement(row, col).classList.add("valid");
    }

    kingPiece(piece) {
        let pieceCtx = document.getElementById(piece.id);
        pieceCtx.classList.add("king");
    }

    updatePiece(piece) {
        let pieceCtx = document.getElementById(piece.id);
        pieceCtx.parentNode.removeChild(pieceCtx);
        let newTile = this.getTileElement(piece.position.row, piece.position.col);
        newTile.appendChild(pieceCtx);
    }

    resetTilesValid() {
        let validTiles = [].slice.call(document.getElementsByClassName("valid"));
        for (let validTile of validTiles) {
            validTile.classList.remove("valid");
        }
    }

    getTileElement(row, col) {
        let tileId = String.fromCharCode(65 + row) + (col + 1);
        return document.getElementById(tileId);
    }
}

export default BoardView;