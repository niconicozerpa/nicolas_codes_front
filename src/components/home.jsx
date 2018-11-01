"use strict";

import React from "react";

export function MySkills(props) {
    return (
    <div>
        <div className="columns">
            <div className="column">
                <div className="notification is-light">
                    <span className="icon is-large">
                        <i className="fab fa-3x fa-js"></i>
                    </span>
                </div>
            </div>
            <div className="column">
                <div className="notification is-light">
                    <span className="icon is-large">
                        <i className="fab fa-3x fa-react"></i>
                    </span>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div className="notification is-light">
                    <span className="icon is-large">
                        <i className="fab fa-3x fa-html5"></i>
                    </span>
                </div>
            </div>
            <div className="column">
                <div className="notification is-light">
                    <span className="icon is-large">
                        <i className="fab fa-3x fa-css3"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>);
}