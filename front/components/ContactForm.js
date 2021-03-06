"use strict";
import React, { useRef, useEffect } from "react";
import _curry from "lodash.curry";
import { SiteContext } from "../ContextManager.js";


function createRecaptcha() {
    const loadRecaptcha = function() {
        try {
            if (typeof window.recaptcha_ok == "undefined") {
                window.recaptcha_ok = false;
                window.recaptchaIsOK = function() {
                    window.recaptcha_ok = true;
                }

                const script = document.createElement("script");
                script.setAttribute("async", "async");
                script.setAttribute("defer", "defer");
                script.setAttribute("src", "https://www.google.com/recaptcha/api.js?render=explicit&onload=recaptchaIsOK");
                document.body.appendChild(script);
            }
        } catch(e) {};
    };

    return function Recaptcha(props) {
        loadRecaptcha();

        const div_elm = useRef(null);

        const getRecaptchaResponse = function(response) {
            if (props.onChange) {
                props.onChange(response);
            }
        }

        useEffect(function() {
            const initObserver = function() {
                if (div_elm.current && div_elm.current.hasChildNodes()) return;

                if (window.recaptcha_ok) {
                    try {
                        window.grecaptcha.render(
                            div_elm.current,
                            {
                                "sitekey": "6LcrkHsUAAAAAORnfAZ8Wrhhnt-t2WofIm31rWEW",
                                "callback": getRecaptchaResponse
                            }
                        );
                    } catch(e) {
                        setTimeout(initObserver, 250);
                    }
                } else {
                    setTimeout(initObserver, 250);
                }
            };
            initObserver();
        });

        return (
            <div>
                <div ref={div_elm}/>
            </div>
        );
    };
};

export const Recaptcha = createRecaptcha();

function createContactForm() {
    const handleInputBase = _curry(function(context, event) {
        context.contact_form_handleInput(
            event.target.name,
            event.target.value
        );
    });

    const handleRecaptcha = _curry(function(context, recaptcha) {
        context.contact_form_handleInput("recaptcha", recaptcha);
    });

    const handleSubmit = _curry(function(context, event) {
        event.preventDefault();
        context.contact_form_handleSubmit();
    });

    const BaseContactForm = function(context) {
        const data = context.contact_form;

        const button_classes = ["button"];
        if (data.loading) {
            button_classes.push("button--loading");
        }

        const handleInput = handleInputBase(context);

        return (
            <section id="contact-me" className="section section--center section--highlighted">
                <h1 className="section__title">Contact Me</h1>
                <p>Please, use the following form to get in touch with me. You can also send me an email to <a className="link" href="mailto:hello@nicolas.codes">hello@nicolas.codes</a>.</p>
                <div className="container">
                    <form className="form" onSubmit={handleSubmit(context)}>
                        <div className="form__field">
                            <label htmlFor="full_name" className="form__label">Full Name</label>
                            <input value={data.form.full_name} type="text" placeholder="Required" onChange={handleInput} required name="full_name" className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="email" className="form__label">Email Address</label>
                            <input value={data.form.email} placeholder="Required" onChange={handleInput} name="email" type="email" required className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="location" className="form__label">Your City</label>
                            <input value={data.form.location} onChange={handleInput} name="location" placeholder="Optional" className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="website" className="form__label">Website</label>
                            <input value={data.form.website} onChange={handleInput} name="website" placeholder="Optional" className="form__textField"/>
                        </div>
                        <div className="form__field form__field--large">
                            <label htmlFor="message" className="form__label">Your Message</label>
                            <textarea value={data.form.message} required name="message" onChange={handleInput} className="form__textField form__textField--area"/>
                        </div>
                        <div className="form__fieldRecaptcha">
                            <Recaptcha onChange={handleRecaptcha(context)}/>
                        </div>
                        <div className="form__submit">
                            <button disabled={data.loading} className={button_classes.join(" ")} type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    };

    return props => (
        <SiteContext.Consumer>{ BaseContactForm }</SiteContext.Consumer>
    );
}

export default createContactForm();