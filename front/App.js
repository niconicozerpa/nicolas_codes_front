"use strict";

import React from "react";
import Contents from "./components/Contents.js";
import { State, SiteContext, DefaultContactForm } from "./ContextManager.js";
import _cloneDeep from "lodash.clonedeep";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = _cloneDeep(State);
        
        this.state.header_updateMobile = (val) => {
            this.setState({
                "header_menu": {
                    "show_mobile": val
                }
            });
        };

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

    render() {
        return (
            <SiteContext.Provider value={this.state}>
                <Contents mode={this.props.mode}/>
            </SiteContext.Provider>
        );
    }
};