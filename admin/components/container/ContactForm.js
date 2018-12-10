"use strict";
import React from "react";
import { connect } from "react-redux";
import { action_creators } from "../../state_management/ContactForm.js";

class BaseContactForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div><button onClick={() => this.props.startFetch('', this.props.token)}>Boo!</button></div>
    }
}


function mapStateToProps(state, own_props) {
    return {
        "token": state.login.active_token,
        "is_fetching": state.contact_form.is_fetching
    };
}

function mapDispatchToProps(dispatch, own_props) {
    return {
        "startFetch": (filter, token) => {
            dispatch(action_creators.fetch(filter, token));
        }
    };
}
export const ContactForm = connect(mapStateToProps, mapDispatchToProps)(BaseContactForm);