"use strict";

import React from "react";
import Contents from "./components/Contents.js";
import { State, SiteContext, DefaultContactForm } from "./ContextManager.js";
import _cloneDeep from "lodash.clonedeep";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = _cloneDeep(State);
    
        this.addHeaderMethodsToContext();
        this.addPortfolioMethodsToContext();
        this.addContactFormMethodsToContext();

        this.addBlogMethodsToContext();
    }

    addHeaderMethodsToContext() {
        this.state.header_updateMobile = (val) => {
            this.setState({
                "header_menu": {
                    "show_mobile": val
                }
            });
        };
    }

    addPortfolioMethodsToContext() {
        this.state.portfolio_load = () => {
            this.setState({
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

                this.setState({
                    "portfolio": {
                        "contents": portfolio_contents.innerHTML,
                        "loading": false
                    }
                });
            });
        }

        this.state.portfolio_unload = () => {
            this.setState({
                "portfolio": {
                    "contents": null,
                    "loading": false
                }
            });
        }
    }
        
    addContactFormMethodsToContext() {
        this.state.contact_form_handleInput = (field, value) => {
            const new_state = _cloneDeep(this.state.contact_form);
            new_state.form[field] = value;
            this.setState({
                "contact_form": new_state
            });
        };

        this.state.contact_form_handleSubmit = () => {
            let new_state = _cloneDeep(this.state.contact_form);
            new_state.loading = true;
            this.setState({ "contact_form": new_state });

            fetch(
            CONTACT_FORM_ENDPOINT,
                {
                    "method": "POST",
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(this.state.contact_form.form)
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
                this.setState({ "contact_form": _cloneDeep(new_state) });
            });
        };
    }

    addBlogMethodsToContext() {
        this.state.blog_load = (params) => {

            this.setState({
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
                this.setState(new_state);
            })
        }
    }

    render() {
        return (
            <SiteContext.Provider value={this.state}>
                <Contents mode={this.props.mode}/>
            </SiteContext.Provider>
        );
    }
};