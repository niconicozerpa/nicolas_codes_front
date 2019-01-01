"use strict";
const path = require("path");

module.exports = {
    "module": {
        "rules": [
            {
                "test": /\.jsx?$/,
                "exclude": /node_modules/,
                "use": [ "babel-loader" ]
            },
            {
                "test": /\.(scss|css|sass)$/,
                "use": [ "style-loader", "css-loader", "sass-loader" ]
            }
        ]
    },
    "entry": {
        "panelpanelpanel": "./admin/index.js",
        "frontend": "./front.js"
    },
    "output": {
        "path": path.resolve(__dirname, "public", "dist"),
        "filename": "[name].app.js"
    },
    "optimization": {
        "splitChunks": {
            "chunks": "all"
        }
    }
};