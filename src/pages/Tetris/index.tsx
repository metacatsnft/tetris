import React from "react";
import TetrisGame from "../../components/Tetris";
import "./index.scss";

export const Tetris = () => {
    return (
        <div id="tetris">
            <TetrisGame />
        </div>
    );
};

export default Tetris;
