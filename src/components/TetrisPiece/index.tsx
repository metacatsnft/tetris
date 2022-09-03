import React from "react";
import Piece from "../../functions/Piece";

interface Props {
    piece: Piece;
}

export default function TetrisPiece({ piece }: Props): JSX.Element {
    const x: number = piece.x;
    const y: number = piece.y;
    return (
        <div
            className="tetris-piece"
            style={{ transform: `translate(${x ? x * 40 : 0}px,${y ? y * 40 : 0}px)` }}
        >
            <div className={piece.className}>
                {piece.shape.map((row, i) =>
                    row.map((cell, j) => {
                        return (
                            <div
                                className={`${cell > 0 ? `piece-cell ${piece.colorClass}` : "grid-cell"}`}
                                key={`${i}-${j}`}
                            ></div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
