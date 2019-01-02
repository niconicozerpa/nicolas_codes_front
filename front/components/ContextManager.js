"use strict";
import React from "react";

export const SiteContext = React.createContext({});

export const State = {
    "header_menu": {
        "show_mobile": false,
    },
    "portfolio": {
        "contents": "",
        "loading": false
    }
};