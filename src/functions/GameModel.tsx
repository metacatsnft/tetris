import { ROWS, COLS } from "./constants";
import Piece from "./Piece";

export default class GameModel {
    public fallingPiece: Piece | null;
    public grid: number[][];
    public setGrid: React.Dispatch<number[][]>;

    constructor(grid: number[][], setGrid: React.Dispatch<number[][]>) {
        this.fallingPiece = null; // piece
        this.grid = this.makeStartingGrid();
        this.setGrid = setGrid;
    }

    makeStartingGrid() {
        return [...new Array(20).fill(new Array(10).fill([0]))];
    }

    collision(x: any, y: any, candidate = null) {
        if (this.fallingPiece) {
            const shape = candidate || this.fallingPiece.shape;
            const n = shape.length;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (shape[i][j] > 0) {
                        let p = x + j;
                        let q = y + i;
                        if (p >= 0 && p < COLS && q < ROWS) {
                            // in bounds
                            if (this.grid[q][p] > 0) {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    renderGameState() {
        if (this.fallingPiece !== null) {
            this.fallingPiece.renderPiece();
        }
    }

    moveDown() {
        if (this.fallingPiece === null) {
            this.renderGameState();
            return;
        } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
            const shape = this.fallingPiece.shape;
            const x = this.fallingPiece.x;
            const y = this.fallingPiece.y;
            shape.map((row, i) => {
                return row.forEach((cell, j) => {
                    let p = x + j;
                    let q = y + i;
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        this.grid[q][p] = shape[i][j];
                    }
                });
            });

            // check game over
            if (this.fallingPiece.y === 0) {
                this.grid = this.makeStartingGrid();
            }
            this.fallingPiece = null;
        } else {
            this.fallingPiece.y += 1;
        }
        this.renderGameState();
    }

    move(right: any) {
        if (this.fallingPiece === null) {
            return;
        }

        let x = this.fallingPiece.x;
        let y = this.fallingPiece.y;

        if (right) {
            // move right
            if (!this.collision(x + 1, y)) {
                this.fallingPiece.x += 1;
            }
        } else {
            // move left
            if (!this.collision(x - 1, y)) {
                this.fallingPiece.x -= 1;
            }
        }
        this.renderGameState();
    }

    rotate() {
        if (this.fallingPiece !== null) {
            let shape = [...this.fallingPiece.shape.map((row) => [...row])];
            // transpose of matrix
            for (let y = 0; y < shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]];
                }
            }
            // reverse order of rows
            shape.forEach((row) => row.reverse());
            if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape as any)) {
                this.fallingPiece.shape = shape;
            }
        }

        this.renderGameState();
    }
}
