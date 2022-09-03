import { COLS } from "./constants";
import GameModel from "./GameModel";

interface IShape {
    name: string;
    className: string;
    colorClass: string;
    shape: number[][];
}

const shapes: IShape[] = [
    {
        name: "iShape",
        className: "i-shape",
        colorClass: "shape1",
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    },
    {
        name: "lShape",
        className: "l-shape",
        colorClass: "shape2",
        shape: [
            [2, 0, 0],
            [2, 2, 2],
            [0, 0, 0],
        ],
    },
    {
        name: "l2Shape",
        className: "l2-shape",
        colorClass: "shape3",
        shape: [
            [0, 0, 3],
            [3, 3, 3],
            [0, 0, 0],
        ],
    },
    {
        name: "oShape",
        className: "o-shape",
        colorClass: "shape4",
        shape: [
            [4, 4],
            [4, 4],
        ],
    },
    {
        name: "sShape",
        className: "s-shape",
        colorClass: "shape5",
        shape: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0],
        ],
    },

    {
        name: "tShape",
        className: "t-shape",
        colorClass: "shape6",
        shape: [
            [0, 6, 0],
            [6, 6, 6],
            [0, 0, 0],
        ],
    },
    {
        name: "zShape",
        className: "z-shape",
        colorClass: "shape7",
        shape: [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ],
    },
];

export default class Piece {
    public data: IShape;
    public shape: number[][];
    public className: string;
    public colorClass: string;
    public model: GameModel;
    public setGrid: React.Dispatch<number[][]>;
    public y: number;
    public x: number;

    constructor(model: GameModel, setGrid: React.Dispatch<number[][]>) {
        this.data = this.getPieceData();
        this.shape = this.data.shape;
        this.className = this.data.className;
        this.colorClass = this.data.colorClass;
        this.model = model;
        this.setGrid = setGrid;
        this.y = 0;
        this.x = Math.floor(COLS / 2);
    }

    getPieceData() {
        return shapes[Math.floor(Math.random() * shapes.length + 0 - 0)];
    }

    renderPiece() {
        this.shape.map((row, i) => {
            row.map((cell, j) => {
                if (cell > 0) {
                    this.setGrid(this.model.grid);
                }
            });
        });
    }
}
