"use strict";

import React from "react";

import { Header, Hero, ContactMeForm, Notification } from "./layout.jsx";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "contact_form_active": false,
            "contact_form_submitting": false,
            "notification_message": ""
        };

        this.hideContactForm = this.hideContactForm.bind(this);
        this.showContactForm = this.showContactForm.bind(this);
        this.submitContactForm = this.submitContactForm.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
    }

    closeNotification() {
        this.setState({ "notification_message" : "" });
    }

    hideContactForm() {
        this.setState({"contact_form_active": false });
    }
    showContactForm() {
        this.setState({"contact_form_active": true });
    }

    submitContactForm(data) {
        this.setState({"contact_form_submitting": true });
        fetch(
            "https://srv1.nicolas.codes/be/",
            {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json; charset=utf-8"
                },
                "mode": "cors",
                "body": JSON.stringify(data)
            }
        )
        .catch(() => {
            alert("An unknown error occurred. Please, try again later.");
            this.setState({
                "contact_form_submitting": false
            });
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.output) {
                this.setState({
                    "notification_message": "Your message has been sent successfully.",
                    "contact_form_submitting": false,
                    "contact_form_active": false
                });
            } else {
                alert("An error occurred. Please, try again later");
                this.setState({
                    "contact_form_submitting": false
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Header
                    onShowContactForm={this.showContactForm}/>
                <Hero/>
                <ContactMeForm
                    active={this.state.contact_form_active}
                    submitting={this.state.contact_form_submitting}
                    onSubmit={this.submitContactForm}
                    onCancel={this.hideContactForm}/>
                <Notification
                    message={this.state.notification_message}
                    onClose={this.closeNotification}/>
            </div>
        );
    }
}