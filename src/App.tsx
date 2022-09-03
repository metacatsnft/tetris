import React from "react";
import Tetris from "./pages/Tetris";
import "./App.scss";
import Layout from "./components/Layout";

const App = (): JSX.Element => {
    return (
        <Layout>
            <Tetris />
        </Layout>
    );
};

export default App;
