import React, { useMemo, useState, useEffect, useCallback } from "react";
import Piece from "../../functions/Piece";
import Game from "../../functions/Tetris";
import "./index.scss";
import TetrisPiece from "./tetris_piece";

const names = [
    "shape0",
    "shape1",
    "shape2",
    "shape3",
    "shape4",
    "shape5",
    "shape6",
    "shape7",
    "shape8",
];

export default function TetrisGame() {
    /**
     * Memoize the starting grid, this reduces computations to one iteration and prevents this expensive action from reoccuring on each render.
     */
    const startingGrid: any = useMemo(() => {
        return [new Array(20).fill(new Array(10).fill([]))];
    }, []);

    const [grid, setGrid] = useState<number[][]>(startingGrid);
    const [piece, setPiece] = useState<Piece | null>(null);

    /**
     * Hacky callback that allows the grid to re-render when it should
     */
    const updateGrid = useCallback(
        (newGrid: number[][]) => {
            setGrid([...newGrid]);
        },
        [grid]
    );

    useEffect(() => {
        if (grid === startingGrid) {
            new Game(grid, updateGrid, piece, setPiece);
        }
    }, [grid, startingGrid, updateGrid, piece, setPiece]);

    return (
        <div className="tetris">
            <div className="grid">
                {piece !== null ? <TetrisPiece piece={piece} /> : null}
                {grid.map((row, i) => {
                    return row.map((cell, j) => {
                        return <div className={`${cell > 0 ? 'piece-cell' : 'grid-cell'} ${names[cell]}`} key={`${i}-${j}`} />;
                    });
                })}{" "}
            </div>
        </div>
    );
}
