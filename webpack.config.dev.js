"use strict";
const merge = require("webpack-merge");
const config_common = require("./webpack.config.common.js");
const path = require("path");

module.exports = merge(
    config_common,
    {
        "mode": "development",
        "devtool": "inline-source-map",
        "devServer": {
            "publicPath": "/panelpanelpanel/dist/",
            "contentBase": path.join(__dirname, "public"),
            "port": 8000
        }
    }
);