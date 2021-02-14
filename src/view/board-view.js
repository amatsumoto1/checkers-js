import Board from "../model/board.js";
import { PieceView } from "./piece-view.js";
import { TileView } from "./tile-view.js";

class BoardView {
    constructor() {
        this.ctx = document.getElementById("board");
        this.pieces = new Map();
        this.takenPieces = new Map();
        this.tiles = new Map();
        this.draw();
    }

    draw() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.addTile(i, j);
            }
        }
    }

    disable() {
        this.ctx.classList.add("disabled");
    }

    enable() {
        this.ctx.classList.remove("disabled");
    }

    addTile(row, col) {
        const tileId = String.fromCharCode(65 + row) + (col + 1);
        const color = row % 2 == col % 2 ? "red" : "black";
        const tile = new TileView(tileId, row, col, color);
        this.tiles.set(tileId, tile);
        this.ctx.appendChild(tile.ctx);
    }

    addPiece(id, color, row, col) {
        const piece = this.takenPieces.has(id) ? this.takenPieces.get(id): new PieceView(id, color);
        this.pieces.set(id, piece);
        this.getTile(row, col).addPiece(piece);
    }

    removePiece(id) {
        let piece = this.pieces.get(id);
        piece.removeFromTile()
        this.pieces.delete(id);
        this.takenPieces.set(id, piece);
    }

    clearBoard() {
        for (let piece of this.pieces) {
            piece[1].removeFromTile();
        }
        this.pieces.clear();
    }

    movePiece(id, row, col) {
        let tile = this.getTile(row, col);
        let piece = this.pieces.get(id);
        piece.removeFromTile();
        tile.addPiece(piece);
    }

    resetSelectedPieces() {
        for (let piece of this.pieces) {
            piece[1].setNotSelected();
        }
    }

    setPieceMoveable(id) {
        this.pieces.get(id).setCanMove();
    }

    setPieceKinged(id) {
        this.pieces.get(id).setKinged();
    }

    setPieceUnkinged(id) {
        this.pieces.get(id).setNotKinged();
    }

    resetMoveablePieces() {
        for (let piece of this.pieces) {
            piece[1].setCannotMove();
        }
    }

    setTileValid(row, col) {
        this.getTile(row, col).setValid();
    }

    resetValidTiles() {
        for (let tile of this.tiles) {
            tile[1].setInvalid();
        }
    }

    bindToOnPieceSelected(callback) {
        for (let piece of this.pieces) {
            piece[1].bindToOnClicked(callback);
        }
    }

    bindToOnTileSelected(callback) {
        for (let tile of this.tiles) {
            tile[1].bindToOnClicked(callback);
        }
    }

    getTile(row, col) {
        let tileId = String.fromCharCode(65 + row) + (col + 1);
        return this.tiles.get(tileId);
    }
}

export default BoardView;