"use strict";
const merge = require("webpack-merge");
const config_common = require("./webpack.config.common.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(
    config_common,
    {
        "mode": "development",
        "devtool": "inline-source-map",
        "devServer": {
            "publicPath": "/dist/",
            "contentBase": path.join(__dirname, "public"),
            "port": 8000
        },
        "plugins": [
            new webpack.DefinePlugin({
                "process.env.SYS_MODE": JSON.stringify("DEVELOPMENT")
            })
        ]
    }
);