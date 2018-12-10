"use strict";
import * as React from "react";
import { connect } from "react-redux";
import { LoginForm } from "../presentational/LoginForm.js";
import { action_creators } from "../../state_management/Login.js";
import { Header } from "../presentational/Header.js";

class BaseLoginManager extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    onSubmit(username, password) {
        if (this.props.onStartLogin) {
            this.props.onStartLogin(username, password);
        }
    }

    handleLogout() {
        this.props.onLogout();
    }

    render() {
        let contents = "";
        if (this.props.active_token) {
            contents = (
                <div>
                    <Header onLogout={this.handleLogout}/>
                    {this.props.children}
                </div>
            );
        } else {
            contents = <section className="section">
                <div className="container">
                    <LoginForm loading={this.props.is_fetching} onSubmit={this.onSubmit}/>
                </div>
            </section>;
        }

        return <div>{contents}</div>;
    }
}

function mapStateToProps(state, own_props) {
    return {
        "active_token": state.login.active_token,
        "is_fetching": state.login.is_fetching
    };
}

function mapDispatchToProps(dispatch, own_props) {
    return {
        "onStartLogin": (username, password) => {
            dispatch(action_creators.start(username, password));
        },
        "onLogout": () => {
            dispatch(action_creators.logout());
        }
    };
}

export const LoginManager = connect(mapStateToProps, mapDispatchToProps)(BaseLoginManager);