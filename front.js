"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./front/App.js";
        
document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.hydrate(
        <BrowserRouter>
            <App/>
        </BrowserRouter>,
        document.querySelector("#root")
    );

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