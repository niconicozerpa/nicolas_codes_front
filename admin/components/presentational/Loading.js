"use strict";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const BaseLoading = props => props.loading ? <div className="loading"></div> : <span></span>;

function mapStateToProps(state) {
    return {
        "loading": state.async_fetching
    }
} 

export const Loading = connect(mapStateToProps)(BaseLoading);

Loading.propTypes = {
    "loading": PropTypes.bool.isRequired
};