"use strict";

import React from "react";
import ReactDOM from "react-dom";

import style from "./scss/main.scss";

import { Header, Hero, ContactMeForm } from "./components/layout.jsx";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "contact_form_active": false
        };

        this.hideContactForm = this.hideContactForm.bind(this);
        this.showContactForm = this.showContactForm.bind(this);
    }

    hideContactForm() {
        this.setState({"contact_form_active": false });
    }
    showContactForm() {
        this.setState({"contact_form_active": true });
    }

    render() {
        return (
            <div>
                <Header
                    onShowContactForm={this.showContactForm}/>
                <Hero/>
                <ContactMeForm
                    active={this.state.contact_form_active}
                    onCancel={this.hideContactForm}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);