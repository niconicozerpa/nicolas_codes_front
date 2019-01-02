import React from "react";

export default class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "showMobile": false
        };
        this.handleClickMobile = this.handleClickMobile.bind(this);
        this.handleClickLink = this.handleClickLink.bind(this);
        
    }
    handleClickMobile(e) {
        e.preventDefault();

        this.setState({
            "showMobile": !this.state.showMobile
        });
    };
    handleClickLink(e) {
        this.setState({
            "showMobile": false
        });
    }

    render() {
        const navbar_classes = ["header__navbar"];
        if (this.state.showMobile) {
            navbar_classes.push("header__navbar--showMobile");
        }

        return (
            <div className="header__menuContainer">
                <a href="" onClick={this.handleClickMobile} className="header__mobileButton">Menu</a>
                <nav className={navbar_classes.join(" ")}>
                    <a data-type="hashLink" onClick={this.handleClickLink} className="header__navbarLink" href="#top">Home</a>
                    <a data-type="hashLink" onClick={this.handleClickLink} className="header__navbarLink" href="#my-work">My Work</a>
                    <a data-type="hashLink" onClick={this.handleClickLink} className="header__navbarLink" href="#skills">Skills</a>
                    <a data-type="hashLink" onClick={this.handleClickLink} href="#contact-me" className="header__navbarLink">Contact Me</a>
                </nav>
            </div>
        );
    }
};