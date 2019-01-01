import React from "react";
"use strict";

class HeaderMenu extends React.Component {
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
}

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "contents": null,
            "loading": false
        };

        this.loadPortfolio = this.loadPortfolio.bind(this);
        this.unloadPortfolio = this.unloadPortfolio.bind(this);
    }

    loadPortfolio(e) {
        e.preventDefault();

        this.setState({ "loading": true });

        fetch("/portfolio.html")
        .then((response) => response.text())
        .then((portfolio_data) => {
            const parser = new DOMParser();
            const portfolio_doc = parser.parseFromString(portfolio_data, "text/html");
            const portfolio_contents = document.importNode(
                portfolio_doc.querySelector("#contents"),
                true
            );

            this.setState({
                "contents": portfolio_contents.innerHTML,
                "loading": false
            });
        });
    }

    unloadPortfolio(e) {
        e.preventDefault();
        this.setState({
            "contents": null,
            "loading": false
        });
    }

    render() {
        const modal = this.state.contents || this.state.loading ? (
            <div className="modal">
                <a href="" onClick={this.unloadPortfolio} className="modal__closeButton"></a>
                <div className="modal__contents" data-type="modal-portfolio-contents">
                    { this.state.loading ? "Loading..." : <div dangerouslySetInnerHTML={{ "__html": this.state.contents } }/> }
                </div>
            </div>
        ) : null;

        return (
            <section className="section section--highlighted" id="my-work">
                <div className="container">
                    <div className="columns columns--nomobile">
                        <div className="columns__column">
                            <img className="section__image" src="img/programming.svg" alt="My Work"/>
                        </div>
                        <div className="columns__column">
                            <h1 className="section__title">My Work</h1>
                            <p className="section__paragraph">This is a selection of my most important projects during my career.</p>
                            <p className="section__paragraph">For the last ten years, I have worked with important clients who demanded
                                robust and reliable websites visited my millions of people every day.
                            </p>
                            <a href="" className="button" onClick={this.loadPortfolio}>View Portfolio</a>
                        </div>
                    </div>
                </div>
                {modal}
            </section>
        );
    }
}

class Recaptcha extends React.Component {
    constructor(props) {
        super(props);
        this.setRefDiv = this.setRefDiv.bind(this);
        this.initObserver = this.initObserver.bind(this);
        this.getRecaptchaResponse = this.getRecaptchaResponse.bind(this);
    }
    setRefDiv(element) {
        this.ref_div = element;
        this.initObserver();
    }

    getRecaptchaResponse(response) {
        if (this.props.onChange) {
            this.props.onChange(response);
        }
    }

    initObserver() {
        if (window.recaptcha_ok) {
            window.grecaptcha.render(
                this.ref_div,
                {
                    "sitekey": "6LcrkHsUAAAAAORnfAZ8Wrhhnt-t2WofIm31rWEW",
                    "callback": this.getRecaptchaResponse
                }
            );
        } else {
            setTimeout(this.initObserver, 250);
        }
    }
    
    render() {
        return (
            <div>
                <div ref={this.setRefDiv}/>
            </div>
        );
    }
}

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.default_form = {
            "full_name": "",
            "email": "",
            "message": "",
            "location": "",
            "website": "",
            "recaptcha": ""
        };

        this.state = {
            "loading": false,
            "form": Object.assign({}, this.default_form)
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        const new_form = Object.assign({}, this.state.form);
        new_form[event.target.name] = event.target.value;

        this.setState({ "form": new_form });
    }

    handleRecaptcha(recaptcha) {
        const new_form = Object.assign({}, this.state.form);
        new_form["recaptcha"] = recaptcha;

        this.setState({ "form": new_form });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({ "loading": true });

        fetch(
            CONTACT_FORM_ENDPOINT,
            {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(this.state.form)
            }
        )
        .then((response) => response.json())
        .then((response) => {
            if (response.code == 200) {
                alert("Thank you for getting in touch with me. I'll answer as soon as possible.");
                
                this.setState({ "form": Object.assign({}, this.default_form) });

            } else {
                if (response.message) {
                    alert("There was a problem when sending the message: " + response.message);
                } else {
                    throw "unknown_error";
                }
            }
        })
        .catch(function(e) {
            alert("There was a problem when sending the message. Please, try it again later or send an email to <hello@nicolas.codes>");
        })
        .finally(() => {
            this.setState({ "loading": false });
        });
    }

    render() {
        const button_classes = ["button"];
        if (this.state.loading) {
            button_classes.push("button--loading");
        }

        return (
            <section id="contact-me" className="section section--center section--highlighted">
                <h1 className="section__title">Contact Me</h1>
                <p>Please, use the following form to get in touch with me. You can also send me an email to <a className="link" href="mailto:hello@nicolas.codes">hello@nicolas.codes</a>.</p>
                <div className="container">
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="form__field">
                            <label htmlFor="full_name" className="form__label">Full Name</label>
                            <input type="text" placeholder="Required" onChange={this.handleInput} required name="full_name" className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="email" className="form__label">Email Address</label>
                            <input placeholder="Required" onChange={this.handleInput} name="email" type="email" required className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="location" className="form__label">Your City</label>
                            <input onChange={this.handleInput} name="location" placeholder="Optional" className="form__textField"/>
                        </div>
                        <div className="form__field">
                            <label htmlFor="website" className="form__label">Website</label>
                            <input onChange={this.handleInput} name="website" placeholder="Optional" className="form__textField"/>
                        </div>
                        <div className="form__field form__field--large">
                            <label htmlFor="message" className="form__label">Your Message</label>
                            <textarea required name="message" onChange={this.handleInput} className="form__textField form__textField--area"/>
                        </div>
                        <div className="form__fieldRecaptcha">
                            <Recaptcha onChange={this.handleRecaptcha}/>
                        </div>
                        <div className="form__submit">
                            <button disabled={this.state.loading} className={button_classes.join(" ")} type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

function App() {
    return (
        <div>
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
        </div>
    );
};


import ReactDOM from "react-dom";
        
document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App/>, document.querySelector("#root"));

    setTimeout(function() {

        function easeOut(current_time, initial_value, value_change, duration) {
            current_time /= duration;
            return -value_change * current_time * (current_time - 2) + initial_value;
        };

        function getScrollableElement()
        {
            const mainStyle = window.getComputedStyle(document.querySelector(".main"), "");
            if(mainStyle.position == "fixed") {
                return document.querySelector(".main__everythingElse");
            } else {
                return document.documentElement;
            }
        }

        function doAnimatedScroll(from, to) {
            const div = getScrollableElement();
            
            let step = 1;
            const duration = 100;
            let diff = to - from;
            
            doAnimatedScroll.animatedFunc = function() {
                if (to != from) {
                    let new_value;
                    
                    new_value = easeOut(step, 0, diff, duration);

                    if (Math.abs(new_value) < 0.5) {
                        div.scrollTo({
                            "left": 0,
                            "top": to,
                            "behavior": "auto"
                        });
                    } else {
                        div.scrollBy({
                            "left": 0,
                            "top": new_value,
                            "behavior": "auto"
                        });
                        if (step < duration) {
                            step++;
                            requestAnimationFrame(doAnimatedScroll.animatedFunc);
                        }
                    }

                    diff = to - div.scrollTop;
                }
            };
            requestAnimationFrame(doAnimatedScroll.animatedFunc);
        }

        function addHashLinkScroll(event) {
            let elm_selector = event.currentTarget.getAttribute("href").split("#");
            elm_selector = "#" + elm_selector[elm_selector.length - 1];
            
            const target = document.querySelector(elm_selector);
            if (target) {
                event.preventDefault();
                doAnimatedScroll(getScrollableElement().scrollTop, target.offsetTop);
            }
        }
        Array.prototype.forEach.call(
            document.querySelectorAll("a[data-type=\"hashLink\"]"),
            function(elm) {
                elm.addEventListener("click", addHashLinkScroll);
            }
        );
    }, 500);
})