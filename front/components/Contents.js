"use strict";
import React from "react";
import HeaderMenu from "./HeaderMenu.js";
import Portfolio from "./Portfolio.js";
import ContactForm from "./ContactForm.js";


export default function Contents() {
    return (
        <div className="main">
            <div className="main__header">
                <header className="header">
                    <div className="header__container">
                        <div className="header__logo">
                            <a href="#top" data-type="hashLink" className="header__logoLink">
                                <span className="header__logoName">Nicolas Zerpa</span>
                                <span className="header__logoDescription">Front-End Web Developer</span>
                            </a>
                        </div>
                        <HeaderMenu/>
                    </div>
                </header>
            </div>
            <div className="main__everythingElse">
                <div className="main_heroSpacer"/>
                <section className="hero" id="top">
                    <div className="hero__content">
                        <h1 className="hero__title">I make Websites that just work</h1>
                        <div className="hero__subtitle">
                            <div>My name is Nicolas Zerpa. I'm an experienced freelance web developer.</div>
                            <div>I'm ready to build your next product, <strong className="hero__subtitleBold">and do it right</strong>.</div>
                        </div>
                        <div>
                            <a className="button button--onDarkBg" data-type="hashLink" href="#contact-me">Contact Me</a>
                        </div>
                    </div>
                </section>
                <Portfolio/>
                <section className="section section--center" id="skills">
                    <div className="container">
                        <h1 className="section__title">Skills</h1>
                        <div className="skills">
                            <div className="skills__skill">
                                <div className="skills__logo"><i className="skills__logo__icon fab fa-js fa-3x"></i></div>
                                <h2 className="skills__title">JavaScript</h2>
                                <div className="skills__description">
                                    It's the most important tool for the Web Developer.
                                    <strong>I'm an expert in this language</strong>, as this is the first language I've ever
                                    learned back in my teenage years.
                                </div>
                            </div>
                            <div className="skills__skill">
                                <div className="skills__logo"><i className="skills__logo__icon fab fa-html5 fa-3x"></i></div>
                                <h2 className="skills__title">HTML &amp; CSS</h2>
                                <div className="skills__description">
                                    These two languages are the building blocks of the Internet.
                                    I always strive to make <strong>lightweight and well-structured code</strong>
                                    in order to ensure <strong>fast page load times</strong>.
                                </div>
                            </div>
                            <div className="skills__skill">
                                <div className="skills__logo"><i className="skills__logo__icon fab fa-react fa-3x"></i></div>
                                <h2 className="skills__title">React</h2>
                                <div className="skills__description">Created by Facebook, it's the go-to library if you need to build a complex
                                    <strong>web application</strong>. I have an <strong>advanced level</strong> in this tool.
                                </div>
                            </div>
                            <div className="skills__skill">
                                <div className="skills__logo"><i className="skills__logo__icon fas fa-laptop fa-3x"></i></div>
                                <h2 className="skills__title">Everything Else</h2>
                                <div className="skills__description">
                                    A professional developer never stops learning. That's why I can also work with
                                    many non-front-end related technologies. For example, <strong>PHP, Java, Python, MySQL,
                                        Node.js</strong> and others.
                                </div>
                            </div>    
                        </div>
                    </div>
                </section>
                <ContactForm/>
                <footer className="footer">
                    <div className="container">
                        <div className="footer__logoName">Nicolas Zerpa</div>
                        <div className="footer__logoDescription">Front-End Web Developer</div>
                        <nav className="footer__navbar">
                            <a className="footer__navbar__link" data-type="hashLink" href="#top">Home</a>
                            <a className="footer__navbar__link" data-type="hashLink" href="#my-work">My Work</a>
                            <a className="footer__navbar__link" data-type="hashLink" href="#skills">Skills</a>
                            <a className="footer__navbar__link" data-type="hashLink" href="#contact-me">Contact Me</a>
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