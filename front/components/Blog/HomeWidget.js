"use strict";

import React from "react";
import { Link } from "react-router-dom";

export default function HomeBlogWidget(props) {
    return (
        <section className="section section--center section--dark">
            <div className="container">
                <h1 className="section__title section__title--dark">
                    <Link to="/blog" className="section__titleLink">Blog</Link>
                </h1>
                <p className="section__paragraph">Read my articles about how to improve your website or application.
                    SEO, design, how to increase traffic, site performance, and much more.</p>
                <Link to="/blog" className="button">Read the Blog</Link>  
            </div>
        </section>
    );
}