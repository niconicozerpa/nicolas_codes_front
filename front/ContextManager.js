"use strict";
import React from "react";
import _cloneDeep from "lodash.clonedeep";

export const SiteContext = React.createContext({});

export const DefaultContactForm = {
    "full_name": "",
    "email": "",
    "message": "",
    "location": "",
    "website": "",
    "recaptcha": "",

    "blog_posts": {},
    "blog_loading": false,
    "blog_specific_post": null
};

export const State = {
    "header_menu": {
        "show_mobile": false
    },
    "portfolio": {
        "contents": "",
        "loading": false
    },
    "contact_form": {
        "loading": false,
        "form": _cloneDeep(DefaultContactForm)
    }
};