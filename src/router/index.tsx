import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";

/**
 * @function AppRouter
 * @description Primary router component for the application. All routes for the app are defined here within the <Switch/> component
 * @returns
 */
export default function AppRouter(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Layout>
                    <Route exact path="/" component={() => <Home />} />
                </Layout>
            </Switch>
        </Router>
    );
}
