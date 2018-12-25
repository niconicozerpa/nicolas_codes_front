"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import * as ReactRedux from "react-redux";
import thunkMiddleware from "redux-thunk";

import "./styles/admin.scss";

import { LoginManager } from "./components/container/LoginManager.js";

import { loginReducer } from "./state_mgmt/Login.js";
import { contactFormReducer } from "./state_mgmt/ContactForm.js";
import { blogReducer } from "./state_mgmt/Blog";
import { asyncReducer } from "./state_mgmt/Async.js";

import { RouteManager } from "./components/container/RouteManager.js";
import { Loading } from "./components/presentational/Loading.js";

const rootReducer = combineReducers(
    {
        "login": loginReducer,
        "contact_form": contactFormReducer,
        "blog": blogReducer,
        "async_fetching": asyncReducer
    }
);
const store = createStore(rootReducer, {}, applyMiddleware(thunkMiddleware));


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        
        <ReactRedux.Provider store={store}>
            <div>
                <Loading/>
                <LoginManager>
                    <RouteManager/>
                </LoginManager>
            </div>
        </ReactRedux.Provider>,
        document.getElementById("root")
    );
});