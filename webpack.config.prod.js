"use strict";
const merge = require("webpack-merge");
const config_common = require("./webpack.config.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(
    config_common,
    {
        "mode": "production",
        "optimization": {
            "minimizer": [ new UglifyJSPlugin() ]
        }
    }
);