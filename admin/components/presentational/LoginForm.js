"use strict";
import * as React from "react";
import PropTypes from "prop-types";

export class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "password": ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(
                this.state.username,
                this.state.password
            );
        }
    }

    handleInput(event) {
        const object = {};
        object[event.target.name] = event.target.value;
        this.setState(object);
    }

    render() {
        const loading = this.props.loading ? this.props.loading : false;

        return <div className="columns is-centered">
            <div className="column is-one-quarter">
                <form onSubmit={this.onSubmit}>
                    <div className="notification is-warning">
                        <strong>Acceso denegado</strong>: Se requiere iniciar sesión
                    </div>
                    <div className="field">
                        <label className="label">Nombre de usuario:</label>
                        <input
                            className="input"
                            type="text"
                            required
                            disabled={loading}
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInput}/>
                    </div>
                    <div className="field">
                        <label className="label">Password:</label>
                        <input
                            className="input"
                            type="password"
                            required
                            disabled={loading}
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}/>
                    </div>
                    <div className="field has-text-centered">
                        <button className={`button is-link ${loading?'is-loading' : ''}`} type="submit">Iniciar sesión</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}
LoginForm.propTypes = {
    "loading": PropTypes.bool.isRequired,
    "onSubmit": PropTypes.func.isRequired
};