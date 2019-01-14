"use strict";
import React from "react";

export default function SubscriptionForm(props) {
    const form_action = `https://codes.us7.list-manage.com/subscribe/post?u=${props.u}&id=${props.id}`;
    const hidden_input_name = `b_${props.u}_${props.id}`;
    return (
        <div className="newsletterSubscription">
            <p>Subscribe to my newsletter and receive new articles via email</p>
            <form action={form_action}
                method="post"
                name="mc-embedded-subscribe-form"
                className="form"
                target="_blank"
                noValidate>
                
                <div className="form__field">
                    <label>
                        <span className="form__label">Full Name </span>
                        <input type="text" name="FNAME" placeholder="Optional" className="form__textField"/>
                    </label>
                </div>
                <div className="form__field">
                    <label>
                        <span className="form__label">Email Address</span>
                        <input required type="email" name="EMAIL" placeholder="Required" className="form__textField"/>
                    </label>
                </div>
                <div style={{"position": "absolute", "left": "-5000px"}} aria-hidden="true">
                    <input type="text" name={hidden_input_name} tabIndex="-1"/>
                </div>
                <div className="form__submit">
                    <input type="submit" value="Subscribe" name="subscribe" className="button"/>
                </div>
            </form>
        </div>
    );
}