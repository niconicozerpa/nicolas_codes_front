import React from "react";
import { Link } from "react-router-dom";
import { SiteContext } from "../ContextManager.js";

export default class HeaderMenu extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleClickMobile = this.handleClickMobile.bind(this);
        this.handleClickLink = this.handleClickLink.bind(this);
        
    }
    handleClickMobile(e) {
        e.preventDefault();
        this.context.header_updateMobile(!this.context.header_menu.show_mobile);
    };
    handleClickLink(e) {
        this.context.header_updateMobile(false);
    }

    render() {
        const navbar_classes = ["header__navbar"];
        if (this.context.header_menu.show_mobile) {
            navbar_classes.push("header__navbar--showMobile");
        }

        return (
            <div className="header__menuContainer">
                <a href="" onClick={this.handleClickMobile} className="header__mobileButton">Menu</a>
                <nav className={navbar_classes.join(" ")}>
                    <a data-type="hashLink" onClick={this.handleClickLink} className="header__navbarLink" href="/" data-hash="#top">Home</a>
                    <a data-type="hashLink" onClick={this.handleClickLink} className="header__navbarLink" href="/#my-work">My Work</a>
                    <a data-type="hashLink" onClick={this.handleClickLink} className="header__navbarLink" href="/#skills">Skills</a>
                    <Link to="/blog/" className="header__navbarLink">Blog</Link>
                    <a data-type="hashLink" onClick={this.handleClickLink} href="/#contact-me" className="header__navbarLink">Contact Me</a>
                </nav>
            </div>
        );
    }
};
HeaderMenu.contextType = SiteContext;