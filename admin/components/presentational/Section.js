"use strict";
import React from "react";

export function Section(props) {
    let title = null, subtitle = null;
    
    if (props.title) {
        title = <h1 className="title">{props.title}</h1>;
    }

    if (props.subtitle) {
        subtitle = <div className="subtitle">{props.subtitle}</div>;
    }
    
    return (
        <section className="section">
            <div className="container">
                { title }
                { subtitle }
                { props.children }
            </div>
        </section>
    );
}