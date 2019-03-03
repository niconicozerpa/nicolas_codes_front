import React, { useState } from "react";
import { Link } from "react-router-dom";
import _curry from "lodash.curry";
import { SiteContext } from "../ContextManager.js";



const handleClickMobile = _curry(function(context, e) {
    e.preventDefault();
    context.header_updateMobile(!context.header_menu.show_mobile);
});

const handleClickLink = _curry(function(context, e) {
    context.header_updateMobile(false);
});

function HeaderMenuWithContext(context) {
                
    const navbar_classes = ["header__navbar"];
    if (context.header_menu.show_mobile) {
        navbar_classes.push("header__navbar--showMobile");
    }

    return (
        <div className="header__menuContainer">
            <a href="" onClick={handleClickMobile(context)} className="header__mobileButton">Menu</a>
            <nav className={navbar_classes.join(" ")}>
                <a data-type="hashLink" onClick={handleClickLink(context)} className="header__navbarLink" href="/" data-hash="#top">Home</a>
                <a data-type="hashLink" onClick={handleClickLink(context)} className="header__navbarLink" href="/#my-work">My Work</a>
                <a data-type="hashLink" onClick={handleClickLink(context)} className="header__navbarLink" href="/#skills">Skills</a>
                <Link to="/blog/" className="header__navbarLink">Blog</Link>
                <a data-type="hashLink" onClick={handleClickLink(context)} href="/#contact-me" className="header__navbarLink">Contact Me</a>
            </nav>
        </div>
    );
};

export default function HeaderMenu(props) {
    return (
        <SiteContext.Consumer>
            { HeaderMenuWithContext }
        </SiteContext.Consumer>
    );
}
