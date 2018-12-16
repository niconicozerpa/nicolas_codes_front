"use strict";
import React from "react";
import PropTypes from "prop-types";

export const SpecificForm = (props) => (
    (!props.form) ? <div></div> : 
    <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title">Detalles de formulario</div>
                </div>
                <div className="card-content">
                    <div className="content">
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
SpecificForm.propTypes = {
    "form": PropTypes.object,
    "onClose": PropTypes.func
};