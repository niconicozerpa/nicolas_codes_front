"use strict";
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import { ContactForm } from "./ContactForm.js";
import { HomePage } from "../presentational/HomePage.js";

export class RouteManager extends React.Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/contact-form" component={ContactForm}/>
            </div>
        </Router>;
    }
}