"use strict";
import React from "react";

import { Route, Link } from "react-router-dom";

import HeaderMenu from "./HeaderMenu.js";
import HomePage from "./HomePage.js";
import Blog from "./Blog/Blog.js";

function CurrentRouter(props) {
    if (props.mode == "server") {
        return (<StaticRouter context={CurrentRouter.context}>{props.children}</StaticRouter>);
    } else {
        return (<BrowserRouter>{props.children}</BrowserRouter>);
    }
};
CurrentRouter.context = {};


export default function Contents(props) {
    return (
        <div className="main">
            <div className="main__header">
                <header className="header">
                    <div className="header__container">
                        <div className="header__logo">
                            <a href="/" data-hash="#top" data-type="hashLink" className="header__logoLink">
                                <span className="header__logoName">Nicolas Zerpa</span>
                                <span className="header__logoDescription">Front-End Web Developer</span>
                            </a>
                        </div>
                        <HeaderMenu/>
                    </div>
                </header>
            </div>
            <div className="main__everythingElse">
                <Route path="/" exact component={HomePage} />
                <Route path="/blog/" exact component={Blog} />
                <Route path="/blog/more/:offset" exact component={Blog} />
                <Route path="/blog/post/:slug/:id" exact component={Blog} />
                <footer className="footer">
                    <div className="container">
                        <div className="footer__logoName">Nicolas Zerpa</div>
                        <div className="footer__logoDescription">Front-End Web Developer</div>
                        <nav className="footer__navbar">
                            <a className="footer__navbar__link" data-type="hashLink" href="/" data-hash="#top">Home</a>
                            <a className="footer__navbar__link" data-type="hashLink" href="/#my-work">My Work</a>
                            <a className="footer__navbar__link" data-type="hashLink" href="/#skills">Skills</a>
                            <Link className="footer__navbar__link" to="/blog/">Blog</Link>
                            <a className="footer__navbar__link" data-type="hashLink" href="/#contact-me">Contact Me</a>
                        </nav>
                        <div className="footer__copyright">
                            <div>© 2018 Raúl Nicolás López Zerpa</div>
                            <div>
                                <span className="argentineFlag">
                                    <span className="argentineFlag__sunOfMay"></span>
                                </span>
                                Made in Argentina
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}