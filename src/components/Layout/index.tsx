import React from "react";
import "./index.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div id="layout"> {children}</div>;
}
