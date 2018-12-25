"use strict";
import React from "react";
import PropTypes from "prop-types";

export function Modal(props) {

    const modal_classes = ["modal"];
    if (props.visible) {
        modal_classes.push("is-active");
    }

    const modal_content_classes = ["modal-content"];
    if (props.wide) {
        modal_content_classes.push("is-wide");
    }

    return (
        <div className={modal_classes.join(" ")}>
            <div className="modal-background"></div>
            <div className={modal_content_classes.join(" ")}>
                <div className="card">
                    <div className="card-header">
                        <div className="card-header-title">{props.title}</div>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                type="button"
                onClick={ props.onClose ? props.onClose : () => {} }/>
        </div>
    );
};
Modal.propTypes = {
    "title": PropTypes.string.isRequired,
    "onClose": PropTypes.func
};