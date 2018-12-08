"use strict";
const path = require("path");

module.exports = {
    "module": {
        "rules": [
            {
                "test": /\.jsx?$/,
                "exclude": /node_modules/,
                "use": [ "babel-loader" ]
            }
        ]
    },
    "entry": "./admin/index.js",
    "output": {
        "path": path.resolve(__dirname, "public", "panelpanelpanel", "dist"),
        "filename": "app.js"
    }
};