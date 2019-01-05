import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import path from "path";
import express from "express";
import serveStatic from "serve-static";
import fs from "fs";

const current_path = path.resolve(".");
const public_path = `${current_path}/public`;

import App from "../front/App.js";

function Template(html) {
    return fs.readFileSync(`${current_path}/public/index.html`).toString().replace("<!--#html-->", html);
}

function ServerApp(req, res, next) {
    const renderSSR = function() {
        const html = ReactDOMServer.renderToString(
            <StaticRouter location={req.originalUrl} context={ServerApp.router_context}>
                <App />
            </StaticRouter>
        );
        const template = Template(html);
        res.send(template);
    }
    
    if (req.originalUrl == "/") {
        renderSSR();
    } else {
        fs.stat(
            path.join(public_path, req.originalUrl),
            function (err, stat) {
                if (err && err.code === "ENOENT") {
                    renderSSR();
                } else {
                    next();
                }
            }
        );
    }
};
ServerApp.router_context = {};

const PORT = process.env.PORT || 8000;
const app = express();

app.use("/", ServerApp);
app.use(serveStatic(public_path));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});