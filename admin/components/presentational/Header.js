"use strict";
import * as React from "react";
import PropTypes from "prop-types";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(event) {
        event.preventDefault();
        if (this.props.onLogout) {
            this.props.onLogout();
        }
    }

    render() {
        return (
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <strong><a href="#/" className="has-text-light">Nicolás Zerpa</a></strong>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a href="#/blog" className="navbar-item">Blogs</a>
                        <a href="#/contact-form" className="navbar-item">Formulario de contacto</a>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-light" href="" onClick={this.onLogout}>Cerrar sesión</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};
Header.propTypes = {
    "onLogout": PropTypes.func
};