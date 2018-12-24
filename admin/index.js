"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import * as ReactRedux from "react-redux";
import thunkMiddleware from "redux-thunk";

import "./styles/admin.scss";

import { LoginManager } from "./components/container/LoginManager.js";
import { ArticleCRUD } from "./components/presentational/ArticleCRUD.js";

import { loginReducer } from "./state_mgmt/Login.js";
import { contactFormReducer } from "./state_mgmt/ContactForm.js";
import { asyncReducer } from "./state_mgmt/Async.js";
import { RouteManager } from "./components/container/RouteManager.js";

import { Loading } from "./components/presentational/Loading.js";

const rootReducer = combineReducers(
    {
        "login": loginReducer,
        "contact_form": contactFormReducer,
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
                <section className="section" style={ { "display": "none" } }>
                    <div className="container">
                        <h1 className="title">Edición del blog</h1>
                        <ArticleCRUD
                            title="Este es un título"
                            lead="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a
                            type specimen book."
                            tags="Uno, dos, tres"
                            display_date={new Date()}
                            real_date={new Date()}
                            body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel est at nulla consectetur hendrerit in ac orci. Phasellus dapibus neque malesuada neque pharetra iaculis. Suspendisse finibus dapibus magna. Nullam sit amet erat id augue lobortis bibendum. Sed sodales nulla imperdiet imperdiet sodales. Proin elementum sapien a tellus molestie, eget consectetur turpis placerat. Integer mollis dapibus pulvinar. Nullam aliquam augue nec dictum condimentum.

        Morbi bibendum tortor at venenatis gravida. Fusce sagittis quis mauris nec bibendum. Pellentesque enim velit, posuere a malesuada eleifend, pharetra nec sem. Curabitur malesuada vitae felis eu scelerisque. Etiam maximus lacus eget tellus pulvinar pretium. Praesent eu neque nec nulla mollis tristique. Nunc aliquet sapien et massa congue, in interdum felis dictum. Morbi a tortor convallis purus facilisis rutrum. Praesent et odio justo.
                                    
        Maecenas gravida venenatis urna in pharetra. Aenean sagittis neque et purus molestie faucibus. Phasellus convallis urna eget mauris porttitor pulvinar. Praesent venenatis tincidunt arcu, quis aliquet arcu consectetur ac. Nullam consequat ullamcorper elit. Nullam ut ex ac ipsum sollicitudin iaculis ut sit amet quam. Mauris interdum viverra eros et mattis.`} />
                    </div>
                </section>
            </div>
        </ReactRedux.Provider>,
        document.getElementById("root")
    );
});