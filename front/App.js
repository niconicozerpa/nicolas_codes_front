"use strict";

import React, { useState } from "react";
import Contents from "./components/Contents.js";
import { State, SiteContext, DefaultContactForm } from "./ContextManager.js";
import _cloneDeep from "lodash.clonedeep";


function addHeaderMethodsToContext(state_ref) {
    const state = state_ref.getState();

    state.header_updateMobile = (val) => {
        state_ref.setState({
            "header_menu": {
                "show_mobile": val
            }
        });
    };
}

function addPortfolioMethodsToContext(state_ref) {
    const state = state_ref.getState();

    state.portfolio_load = () => {
        state_ref.setState({
            "portfolio": {
                "loading": true,
                "contents": null
            }
        });

        fetch("/portfolio.html")
        .then((response) => response.text())
        .then((portfolio_data) => {
            const parser = new DOMParser();
            const portfolio_doc = parser.parseFromString(portfolio_data, "text/html");
            const portfolio_contents = document.importNode(
                portfolio_doc.querySelector("#contents"),
                true
            );

            state_ref.setState({
                "portfolio": {
                    "contents": portfolio_contents.innerHTML,
                    "loading": false
                }
            });
        });
    }

    state.portfolio_unload = () => {
        state_ref.setState({
            "portfolio": {
                "contents": null,
                "loading": false
            }
        });
    }
}
    
function addContactFormMethodsToContext(state_ref) {
    const state = state_ref.getState();
    
    state.contact_form_handleInput = (field, value) => {
        const state = state_ref.getState();
        const new_state = _cloneDeep(state.contact_form);
        new_state.form[field] = value;
        state_ref.setState({
            "contact_form": new_state
        });
    };

    state.contact_form_handleSubmit = () => {
        const state = state_ref.getState();
        let new_state = _cloneDeep(state.contact_form);
        new_state.loading = true;
        state_ref.setState({ "contact_form": new_state });

        fetch(
            CONTACT_FORM_ENDPOINT,
            {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(state.contact_form.form)
            }
        )
        .then((response) => response.json())
        .then((response) => {
                if (response.code == 200) {
                alert("Thank you for getting in touch with me. I'll answer as soon as possible.");
                
                new_state.form = DefaultContactForm;
            } else {
                if (response.message) {
                    alert("There was a problem when sending the message: " + response.message);
                } else {
                    throw "unknown_error";
                }
            }
        })
        .catch(function(e) {
            alert("There was a problem when sending the message. Please, try it again later or send an email to <hello@nicolas.codes>");
        })
        .finally(() => {
            new_state.loading = false;
            state_ref.setState({ "contact_form": _cloneDeep(new_state) });
        });
    };
}

function addBlogMethodsToContext(state_ref) {
    const state = state_ref.getState();
    state.blog_load = (params) => {

        state_ref.setState({
            "blog_loading": true,
            "blog_posts": null,
            "blog_specific_post": null
        });

        const new_state = {};

        let url;
        if (params.id) {
            url = `${SERVICE_BASE_URL}/get-blog-article?id=${params.id}`;
        } else {
            let offset = parseInt(params.offset);
            if (isNaN(offset)) {
                offset = 0;
            }
            url = `${SERVICE_BASE_URL}/list-blog-articles?offset=${offset}`;
        }

        fetch(url)
        .then((response) => response.json())
        .then((response) => {
            if (response.id) {
                new_state.blog_specific_post = response;
                new_state.blog_posts = null;
            } else {
                new_state.blog_specific_post = null;
                new_state.blog_posts = response;
            }
        })
        .finally(() => {
            new_state.blog_loading = false;
            state_ref.setState(new_state);
        })
    }
}

function createMergingSetState(old_state, setStateFunc) {
    return function(value) {
        const merged_value = Object.assign({}, old_state, value);
        return setStateFunc(merged_value);
    }
}

function createStateRef() {
    if (!createStateRef.state_ref) {
        const state_ref = {
            "state": _cloneDeep(State),
            "setState": null,
            "getState": function() { return this.state; }
        };

    
        addHeaderMethodsToContext(state_ref);
        addPortfolioMethodsToContext(state_ref);
        addContactFormMethodsToContext(state_ref);

        addBlogMethodsToContext(state_ref);

        createStateRef.state_ref = state_ref;
    }
    
    return createStateRef.state_ref;
}

export default function App(props) {
    
    const state_ref = createStateRef();
    const [ state, setStateBasic ] = useState(state_ref.state);

    const setState = createMergingSetState(state, setStateBasic);

    state_ref.setState = setState;
    state_ref.getState = () => { return state; };

    return (
        <SiteContext.Provider value={state}>
            <Contents mode={props.mode}/>
        </SiteContext.Provider>
    );
};