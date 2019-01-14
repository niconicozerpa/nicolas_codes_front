"use strict";

import React from "react";

export default function PageHeader(props) {
    return (
        <section className="pageTitle">
            <div className="container container--withSpace">
                <h1 className="pageTitle__title">{props.title}</h1>
            </div>
        </section>
    );
}