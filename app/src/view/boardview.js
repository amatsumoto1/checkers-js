class BoardView {
    constructor() {
        this.drawBoard();
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
        let tile = "<div id=" + tileId + "></div>";
        $("#board").append(tile);
        $("#" + tileId).addClass("board-tile");
        $("#" + tileId).addClass(row % 2 == col % 2 ? "red-tile" : "black-tile");
    }

    renderPiece(piece) {
        let pieceCtx = "<div id=" + piece.id + "></div>";
        let tile = this.getTileElement(piece.position.row, piece.position.col);
        tile.append(pieceCtx);
        $("#" + piece.id).addClass("board-piece");
        $("#" + piece.id).addClass(piece.color + "-piece");
        if (piece.isKing) {
            $("#" + piece.id).addClass("king");
        }

        $("#" + piece.id).on("click", function() {
            if ($(this).hasClass("valid")) {

            }
        });
    }

    removePiece(piece) {
        $("#" + piece.id).remove();
    }

    setPieceValid(piece) {
        $("#" + piece.id).addClass("legal");
    }

    setPieceInvalid(piece) {
        $("#" + piece.id).removeClass("legal");
    }

    getTileElement(row, col) {
        let tileId = String.fromCharCode(65 + row) + (col + 1);
        return $("#" + tileId);
    }
}

export default BoardView;