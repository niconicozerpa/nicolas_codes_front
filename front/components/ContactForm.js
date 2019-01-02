"use strict";
import React from "react";

export class Recaptcha extends React.Component {
    constructor(props) {
        super(props);
        this.setRefDiv = this.setRefDiv.bind(this);
        this.initObserver = this.initObserver.bind(this);
        this.getRecaptchaResponse = this.getRecaptchaResponse.bind(this);
    }
    setRefDiv(element) {
        this.ref_div = element;
        this.initObserver();
    }

    getRecaptchaResponse(response) {
        if (this.props.onChange) {
            this.props.onChange(response);
        }
    }

    initObserver() {
        if (window.recaptcha_ok) {
            window.grecaptcha.render(
                this.ref_div,
                {
                    "sitekey": "6LcrkHsUAAAAAORnfAZ8Wrhhnt-t2WofIm31rWEW",
                    "callback": this.getRecaptchaResponse
                }
            );
        } else {
            setTimeout(this.initObserver, 250);
        }
    }
    
    render() {
        return (
            <div>
                <div ref={this.setRefDiv}/>
            </div>
        );
    }
}

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.default_form = {
            "full_name": "",
            "email": "",
            "message": "",
            "location": "",
            "website": "",
            "recaptcha": ""
        };

        this.state = {
            "loading": false,
            "form": Object.assign({}, this.default_form)
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        const new_form = Object.assign({}, this.state.form);
        new_form[event.target.name] = event.target.value;

        this.setState({ "form": new_form });
    }

    handleRecaptcha(recaptcha) {
        const new_form = Object.assign({}, this.state.form);
        new_form["recaptcha"] = recaptcha;

        this.setState({ "form": new_form });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({ "loading": true });

        fetch(
            CONTACT_FORM_ENDPOINT,
            {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(this.state.form)
            }
        )
        .then((response) => response.json())
        .then((response) => {
            if (response.code == 200) {
                alert("Thank you for getting in touch with me. I'll answer as soon as possible.");
                
                this.setState({ "form": Object.assign({}, this.default_form) });

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
            this.setState({ "loading": false });
        });
    }

    render() {
        const button_classes = ["button"];
        if (this.state.loading) {
            button_classes.push("button--loading");
        }

        return (
            <section id="contact-me" className="section section--center section--highlighted">
                <h1 className="section__title">Contact Me</h1>
                <p>Please, use the following form to get in touch with me. You can also send me an email to <a className="link" href="mailto:hello@nicolas.codes">hello@nicolas.codes</a>.</p>
                <div className="container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="form__field">
                            <label htmlFor="full_name" className="form__label">Full Name</label>
                            <input type="text" placeholder="Required" onChange={this.handleInput} required name="full_name" className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="email" className="form__label">Email Address</label>
                            <input placeholder="Required" onChange={this.handleInput} name="email" type="email" required className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="location" className="form__label">Your City</label>
                            <input onChange={this.handleInput} name="location" placeholder="Optional" className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="website" className="form__label">Website</label>
                            <input onChange={this.handleInput} name="website" placeholder="Optional" className="form__textField"/>
                        </div>
                        <div className="form__field form__field--large">
                            <label htmlFor="message" className="form__label">Your Message</label>
                            <textarea required name="message" onChange={this.handleInput} className="form__textField form__textField--area"/>
                        </div>
                        <div className="form__fieldRecaptcha">
                            <Recaptcha onChange={this.handleRecaptcha}/>
                        </div>
                        <div className="form__submit">
                            <button disabled={this.state.loading} className={button_classes.join(" ")} type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
};