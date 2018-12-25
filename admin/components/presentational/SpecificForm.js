"use strict";
import React from "react";
import PropTypes from "prop-types";

import { Modal } from "./Modal.js";

export const SpecificForm = (props) => (
    (!props.form) ? <div></div> : 
    <Modal
        title="Detalles de formulario"
        onClose={ props.onClose ? props.onClose : () => {} }
        visible>
        <div className="columns">
            <div className="column is-one-third"><strong>ID</strong></div>
            <div className="column is-two-thirds">{props.form.id}</div>
        </div>
        <div className="columns">
            <div className="column is-one-third"><strong>Nombre</strong></div>
            <div className="column is-two-thirds">{props.form.full_name}</div>
        </div>
        <div className="columns">
            <div className="column is-one-third"><strong>Ubicación</strong></div>
            <div className="column is-two-thirds">{props.form.location}</div>
        </div>
        <div className="columns">
            <div className="column is-one-third"><strong>Website</strong></div>
            <div className="column is-two-thirds">{props.form.website}</div>
        </div>
        <div className="columns">
            <div className="column is-one-third"><strong>Email</strong></div>
            <div className="column is-two-thirds">{props.form.email}</div>
        </div>
        <div className="columns">
            <div className="column is-one-third"><strong>Fecha</strong></div>
            <div className="column is-two-thirds">{props.form.created_at}</div>
        </div>
        <div className="columns">
            <div className="column is-one-third"><strong>Mensaje</strong></div>
            <div className="column is-two-thirds">{props.form.message}</div>
        </div>
    </Modal>
);
SpecificForm.propTypes = {
    "form": PropTypes.object,
    "onClose": PropTypes.func
};