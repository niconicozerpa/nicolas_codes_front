"use strict";

import React from "react";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.showContactForm = this.showContactForm.bind(this);
    }
    showContactForm(e) {
        e.preventDefault();
        this.props.onShowContactForm();
    }
    render() {
        return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item">
                    <h1 className="title">Nicolas Zerpa</h1>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <a href="" onClick={this.showContactForm} className="is-light is-small button">Contact Me</a>
                </div>
            </div>
        </nav>
        );
    }
}

export function Hero() {
    return (
        <section className="hero is-medium is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Full-stack Web Developer</h1>
                    <div className="subtitle">My name is Nicolas, and I'm an independent Web developer. With more than 10 years of experience, I am specialized in PHP, MySQL, JavaScript, HTML, CSS, and many other technologies. My mission is to help my customers with robust, high-quality software solutions in which your business can rely on.</div>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <div>© 2018 Raúl Nicolás López Zerpa</div>
                <div>
                    <span className="bandera-argentina">
                        <span className="sol-de-mayo"></span>
                    </span>
                    Made in Argentina
                </div>
            </div>
        </footer>
    );
}

export function Notification(props) {
    return (
        <div className={"bottom-notif" + (props.message ? " is-visible":"") }>
            <div className="notification is-primary">
                <button className="delete" type="button" onClick={props.onClose}></button>
                {props.message}
            </div>
        </div>
    );
}

export class ContactMeForm extends React.Component {
    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
        this.updateInput = this.updateInput.bind(this);

        this.state = {
            "full_name": "",
            "email": "",
            "website": "",
            "contents": ""
        };
    }

    submit(e) {
        e.preventDefault();
        if (!this.props.submitting) {
            this.props.onSubmit(Object.assign({}, this.state));
        }
    }

    cancel(e) {
        e.preventDefault();
        this.props.onCancel();
    }

    updateInput(e) {
        const new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }

    render() {
        return (
            <div className={"modal" + (this.props.active ? " is-active" : "") }>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="title">Contact Me</div>
                            <form onSubmit={this.submit}>
                                <div className="field">
                                    <label className="label">Name *</label>
                                    <div className="control">
                                        <input
                                            value={this.state.full_name}
                                            onChange={this.updateInput}
                                            className="input" type="text" name="full_name" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email *</label>
                                    <div className="control">
                                        <input
                                            value={this.state.email}
                                            onChange={this.updateInput}
                                            className="input" type="email" name="email" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Website</label>
                                    <div className="control">
                                        <input
                                            value={this.state.website}
                                            onChange={this.updateInput}
                                            className="input" type="text" name="website" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Your Message:</label>
                                    <div className="control">
                                        <textarea className="textarea" name="contents" onChange={this.updateInput} value={this.state.contents}></textarea>
                                    </div>
                                </div>

                                <div className="field is-grouped">
                                    <div className="control">
                                        <button type="submit" className={
                                            "button is-link" +
                                            (this.props.submitting ? " is-loading":"")
                                        }>Submit</button>
                                    </div>
                                    <div className="control">
                                        <button type="button" onClick={this.cancel} className="button is-text">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <button onClick={this.cancel} className="modal-close is-large" aria-label="close"></button>
            </div>
        );
    }
}