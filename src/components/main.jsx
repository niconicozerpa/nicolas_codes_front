"use strict";

import React from "react";

import { Header, Hero, ContactMeForm, Notification, Footer } from "./layout.jsx";
import { MySkills } from "./home";


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
            process.env.SERVICE_ENDPOINT,
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
                
                <section className="section">
                    <div className="container">
                        <h1 className="title">About Me</h1>
                        <div className="has-text-centered">My name is Nicolas Zerpa, and I'm an independent Web developer.
                        With more than 10 years of experience, my mission is to help my customers with <strong>robust,
                        high-quality software</strong> solutions in which their business can rely on.</div>
                    </div>
                </section>

                <section className="section has-background-light">
                    <div className="container">
                        <h1 className="title">Portfolio</h1>
                        <div className="has-text-centered">
                            <p>Through all these years, I've worked in many projects, including high traffic web sites.</p>
                            <p><button className="button">View Portfolio</button></p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h1 className="title">Technical Skills</h1>
                        <MySkills/>
                    </div>
                </section>
                
                <Footer/>
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