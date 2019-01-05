"use strict";
const path = require("path");
const merge = require("webpack-merge");
const config_common = require("./webpack.config.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const NodeExternals = require("webpack-node-externals");

const config_client = merge(
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

const config_ssr = merge(
    config_client,
    {
        "target": "node",
        "externals": [ NodeExternals() ],
        "entry": "./ssr/server.js",
        "output": {
            "path": path.resolve(__dirname, "ssr", "dist"),
            "filename": "ssr.app.js"
        },
    });


module.exports = [config_client, config_ssr];