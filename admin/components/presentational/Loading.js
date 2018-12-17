"use strict";
import React from "react";
import PropTypes from "prop-types";

export const Loading = props => props.loading ? <div className="loading"></div> : <span></span>;
Loading.propTypes = {
    "loading": PropTypes.bool.isRequired
};