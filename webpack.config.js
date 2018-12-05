"use strict";
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

module.exports = {
    "mode": "development",
    "module": {
        "rules": [
            {
                "test": /\.jsx?$/,
                "exclude": /node_modules/,
                "use": [ "babel-loader" ]
            }
        ]
    },
    "optimization": {
        "minimizer": [ new UglifyJSPlugin() ]
    },
    "entry": "./admin/index.js",
    "output": {
        "path": path.resolve(__dirname, "public", "panelpanelpanel", "dist"),
        "filename": "app.js"
    },
    "devServer": {
        "publicPath": "/panelpanelpanel/dist/",
        "contentBase": path.join(__dirname, "public"),
        "port": 8000
    }
};