"use strict";
const merge = require("webpack-merge");
const config_common = require("./webpack.config.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(
    config_common,
    {
        "mode": "production",
        "optimization": {
            "minimizer": [ new UglifyJSPlugin() ]
        },
        "plugins": [
            new webpack.DefinePlugin({
                "process.env.SYS_MODE": JSON.stringify("PRODUCTION")
            })
        ]
    }
);