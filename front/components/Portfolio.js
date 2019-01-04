"use strict";
import React from "react";
import { SiteContext } from "../ContextManager.js";

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.loadPortfolio = this.loadPortfolio.bind(this);
        this.unloadPortfolio = this.unloadPortfolio.bind(this);
    }

    loadPortfolio(e) {
        e.preventDefault();
        this.context.portfolio_load();
    }

    unloadPortfolio(e) {
        e.preventDefault();
        this.context.portfolio_unload();
    }

    render() {
        const data = this.context.portfolio;
        const modal = data.contents || data.loading ? (
            <div className="modal">
                <a href="" onClick={this.unloadPortfolio} className="modal__closeButton"></a>
                <div className="modal__contents" data-type="modal-portfolio-contents">
                    { data.loading ? "Loading..." : <div dangerouslySetInnerHTML={{ "__html": data.contents } }/> }
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
};
Portfolio.contextType = SiteContext;