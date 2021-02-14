export class PieceView {
    constructor(id, color) {
        this.ctx = document.createElement("div");
        this.moveable = false;
        this.onClicked = function() {};
        this.draw(id, color);
    }

    draw(id, color) {
        this.ctx = document.createElement("div");
        this.ctx.id = id;
        this.ctx.classList.add("board-piece");
        this.ctx.classList.add(color + "-piece");
        this.ctx.onclick = this.handleClick.bind(this);
    }

    bindToOnClicked(callback) {
        this.onClicked = callback;
    }

    handleClick() {
        if (this.moveable) {
            this.onClicked(this.ctx.id);
            this.setSelected();
        }
    }

    setCanMove() {
        this.moveable = true;
        this.ctx.classList.add("moveable-piece");
    }

    setCannotMove() {
        this.moveable = false;
        this.ctx.classList.remove("moveable-piece");
    }

    setSelected() {
        this.ctx.classList.add("selected");
    }

    setNotSelected() {
        this.ctx.classList.remove("selected");
    }

    setKinged() {
        this.ctx.classList.add("king-piece");
    }

    setNotKinged() {
        this.ctx.classList.remove("king-piece");
    }

    removeFromTile() {
        this.ctx.parentElement.removeChild(this.ctx);
    }

    removeFromBoard() {
        this.ctx.parentElement.removeChild(this.ctx);
    }
}