import GameModel from "./GameModel";
import Piece from "./Piece";

export default class Game {
    public grid: number[][];
    public setGrid: React.Dispatch<number[][]>;
    public piece: Piece | null;
    public setPiece: React.Dispatch<Piece>;
    public model: GameModel;

    constructor(
        grid: number[][],
        setGrid: React.Dispatch<number[][]>,
        piece: Piece | null,
        setPiece: React.Dispatch<Piece>
    ) {
        this.grid = grid;
        this.setGrid = setGrid;
        this.piece = piece;
        this.setPiece = setPiece;
        this.model = new GameModel(this.grid, this.setGrid);
        this.addEventListener();

        setInterval(() => {
            this.newGameState();
            this.setGrid(this.model.grid);
        }, 100);
    }

    newGameState = () => {
        this.fullSend();
        if (this.model.fallingPiece === null) {
            //const rand = Math.round(Math.random() * 6) + 1
            const newPiece = new Piece(this.model, this.setGrid);
            this.model.fallingPiece = newPiece;
            this.model.moveDown();
        } else {
            this.model.moveDown();
        }
        this.setPiece(this.model.fallingPiece);
    };

    fullSend = () => {
        const allFilled = (row: any) => {
            for (let x of row) {
                if (x === 0) {
                    return false;
                }
            }

            return true;
        };

        for (let i = 0; i < this.model.grid.length; i++) {
            if (allFilled(this.model.grid[i])) {
                //score += SCORE_WORTH
                this.model.grid.splice(i, 1);
                this.model.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                this.setGrid(this.model.grid);
            }
        }

        //scoreboard.innerHTML = "Score: " + String(score)
    };

    addEventListener() {
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
            switch (e.key) {
                case "w":
                    this.model.rotate();
                    break;
                case "d":
                    this.model.move(true);
                    break;
                case "s":
                    this.model.moveDown();
                    break;
                case "a":
                    this.model.move(false);
                    break;
            }
        });
    }
}
