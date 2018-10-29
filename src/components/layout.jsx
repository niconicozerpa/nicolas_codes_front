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
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item">
                    <h1 className="title">Nicolas Zerpa</h1>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <a href="" onClick={this.showContactForm} className="is-dark is-small button">Contact Me</a>
                </div>
            </div>
        </nav>
        );
    }
}

export function Hero() {
    return (
        <section className="hero is-medium is-light">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Full-stack Web Developer</h1>
                    <div className="subtitle">My name is Nicolas, and I'm an independent Web developer. With more than 10 years of experience, I am specialized in PHP, MySQL, JavaScript, HTML, CSS, and many other technologies. My mission is to help my customers with robust, high-quality software solutions in which your business can rely on.</div>
                </div>
            </div>
        </section>
    );
}

export class ContactMeForm extends React.Component {
    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
    }

    cancel(e) {
        e.preventDefault();
        this.props.onCancel();
    }

    render() {
        return (
            <div className={"modal" + (this.props.active ? " is-active" : "") }>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="title">Contact Me</div>
                            <form>
                                <div className="field">
                                    <label className="label">Name *</label>
                                    <div className="control">
                                        <input className="input" type="text" name="full_name" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email *</label>
                                    <div className="control">
                                        <input className="input" type="email" name="email" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Website</label>
                                    <div className="control">
                                        <input className="input" type="text" name="website" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Your Message:</label>
                                    <div className="control">
                                        <textarea className="textarea" name="contents"></textarea>
                                    </div>
                                </div>

                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link">Submit</button>
                                    </div>
                                    <div className="control">
                                        <button onClick={this.cancel} className="button is-text">Cancel</button>
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