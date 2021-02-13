export class TileView {
    constructor(id, row, col, color) {
        this.ctx = document.createElement("div");
        this.row = row;
        this.col = col;
        this.onClicked = function(row, col) {};
        this.draw(id, color);
    }

    draw(id, color) {
        this.ctx.id = id;
        this.ctx.classList.add("board-tile");
        this.ctx.classList.add(color + "-tile");
        this.ctx.onclick = this.handleClick.bind(this);
    }

    bindToOnClicked(callback) {
        this.onClicked = callback;
    }

    handleClick() {
        if (!this.ctx.hasChildNodes()) {
            this.onClicked(this.row, this.col);
        }
    }

    setValid() {
        this.ctx.classList.add("valid-tile");
    }

    setInvalid() {
        this.ctx.classList.remove("valid-tile");
    }

    addPiece(piece) {
        this.ctx.appendChild(piece.ctx);
    }

    removePiece(piece) {
        this.ctx.removeChild(piece.ctx);
    }
}