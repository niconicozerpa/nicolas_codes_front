import React from "react";
import ReactDOM from "react-dom";

import style from "./scss/main.scss";

const ahora = (new Date()).toLocaleTimeString();

ReactDOM.render(
    <div>Hola mundo, son las {ahora}</div>,
    document.getElementById("root")
);