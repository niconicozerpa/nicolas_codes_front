"use strict";
import React from "react";
import Portfolio from "./Portfolio.js";
import ContactForm from "./ContactForm.js";
import HomeBlogWidget from "./Blog/HomeWidget.js";

const AboutMe = () => (
    <section className="section section--center section--highlighted" id="about">
        <div className="container">
            <h1 className="section__title">About Me</h1>
            <p>Based in Buenos Aires, Argentina, I'm a software developer with have over a decade of
                professional experience, working with both small and big clients. I'm focused on
                web applications and websites, and I love to bridge the gap between technology and
                my customer's needs.
            </p>
            <hr className="hr"/>
        </div>
    </section>
);

const Skills = () => (
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
);

export default function HomePage() {
    return (
        <div>
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
                <AboutMe/>
                <Portfolio/>
                <HomeBlogWidget/>
                <Skills/>
                <ContactForm/>
            </div>
    );
}