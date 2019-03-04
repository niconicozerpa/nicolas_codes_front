"use strict";
import React from "react";
import _curry from "lodash.curry";
import { SiteContext } from "../ContextManager.js";


const loadPortfolio = _curry(function(context, e) {
    e.preventDefault();
    context.portfolio_load();
});

const unloadPortfolio = _curry(function(context, e) {
    e.preventDefault();
    context.portfolio_unload();
});


function PortfolioWithContext(context) {
    const data = context.portfolio;
    const modal = data.contents || data.loading ? (
        <div className="modal">
            <a href="" onClick={unloadPortfolio(context)} className="modal__closeButton"></a>
            <div className="modal__contents" data-type="modal-portfolio-contents">
                { data.loading ? "Loading..." : <div dangerouslySetInnerHTML={{ "__html": data.contents } }/> }
            </div>
        </div>
    ) : null;

    return (
        <section className="section" id="my-work">
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
                        <a href="" className="button" onClick={loadPortfolio(context)}>View Portfolio</a>
                    </div>
                </div>
            </div>
            {modal}
        </section>
    );
};
export default function Portfolio(props) {
    return (<SiteContext.Consumer>
        { context => PortfolioWithContext(context) }
    </SiteContext.Consumer>);
}