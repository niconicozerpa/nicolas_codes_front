"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import * as ReactRedux from "react-redux";
import thunkMiddleware from "redux-thunk";
import "bulma";

import { LoginManager } from "./components/container/LoginManager.js";
import { List } from "./components/presentational/List.js";
import { ArticleCRUD } from "./components/presentational/ArticleCRUD.js";

import { loginReducer } from "./state_management/login.js";

const rootReducer = combineReducers(
    {
        "login": loginReducer
    }
);
const store = createStore(rootReducer, {}, applyMiddleware(thunkMiddleware));

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <ReactRedux.Provider store={store}>
            <LoginManager>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Blog</h1>
                        <div className="subtitle">Lista de artículos</div>
                        <div>
                            <List cols={[
                                    { "key": "id", "label": "ID" },
                                    { "key": "title", "label": "Título" },
                                    { "key": "lead", "label": "Texto corto" },
                                    { "key": "display_date", "label": "Fecha visible" },
                                    { "key": "created_at", "label": "Fecha real" },
                                    { "key": "tags", "label": "Tags" }
                                ]}
                                data={[
                                    {
                                        "id": 2,
                                        "title": "Hello world",
                                        "lead": "This is just an example bla bla bla",
                                        "display_date": "2018-11-28 23:06:41",
                                        "created_at": "2018-11-30 15:30:00",
                                        "tags": "#loremipsum, #blog"
                                    },
                                    {
                                        "id": 3,
                                        "title": "Hello world",
                                        "lead": "This is just an example bla bla bla",
                                        "display_date": "2018-11-28 23:06:41",
                                        "created_at": "2018-11-30 15:30:00",
                                        "tags": "#loremipsum, #blog"
                                    }
                                ]}
                                actions={[
                                    {
                                        "label": "Edit",
                                        "onClick": function(row) { alert("Edit #" + row.id); },
                                        "className": "is-info"
                                    },
                                    {
                                        "label": "Unpublish",
                                        "onClick": function(row) { alert("Unpublish #" + row.id); },
                                        "className": "is-danger"
                                    }
                                ]}
                                loading={false}
                                onFilter={function(filter) {
                                    alert("Filter: " + filter);
                                }}
                                hasMore={false}
                                onLoadMore={function (e) {
                                    alert("Load More: " + e)
                                }}
                                
                                hasNewItem={true}
                                onNewItem={function() {
                                    alert("New Item");
                                }}
                            />
                        </div>
                    </div>
                </section>
                <section className="section">
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
            </LoginManager>
        </ReactRedux.Provider>,
        document.getElementById("root")
    );
});