"use strict";
import React from "react";
import PropTypes from "prop-types";

function Field(props) {
    
    const child_elements = props.children ? (
        props.children instanceof Array ? props.children : [ props.children ]
    ) : null;

    const children = [];
    for (let i = 0; i < child_elements.length; i++) {
        children.push(
            <div
                className={[ "field", props.narrow ? "is-narrow":null ].filter(e => e !== null).join(" ") }
                key={`key-${i}`}>
                <div className="control">
                    {child_elements[i]}
                </div>
            </div>
        );
    }

    return <div className="field is-horizontal">
        <div className="field-label is-normal has-text-left">
            <label className="label">{props.label}</label>
        </div>
        <div className="field-body">
            {children}
        </div>
        
    </div>;
}
Field.propTypes = {
    "narrow": PropTypes.bool,
    "label": PropTypes.string
};

function splitDate(date_obj) {
    let date_str = "";
    let time_str = "";

    if (date_obj) {
        [date_str, time_str] = date_obj.toISOString().split("T");
        time_str = time_str.replace(/Z$/, "");
    }

    return [date_str, time_str];
}

export class ArticleCRUD extends React.Component {
    constructor(props) {
        super(props);

        const [display_date_str, display_time_str] = splitDate(props.display_date);
        const [real_date_str, real_time_str] = splitDate(props.real_date);
        
        this.state = {
            "title": props.title ? props.title : "",
            "lead": props.lead ? props.lead : "",
            "body": props.body ? props.body : "",
            "tags": props.tags ? props.tags : "",
            "visible": props.visible ? props.visible : false,
            "display_date": display_date_str,
            "display_time": display_time_str,
            "real_date": real_date_str,
            "real_time": real_time_str
        };

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        const object = {};
        object[event.target.name] = event.target.value;
        this.setState(object);
    }

    render() {
        return (
            <div>
                <form>
                    <Field label="Título">
                        <input
                            type="text"
                            className="input"
                            value={this.state.title}
                            name="title"
                            onChange={this.handleInput}
                            />
                    </Field>
                    <Field label="Fecha para mostrar" narrow>
                        <input
                            type="date"
                            className="input"
                            name="date"
                            value={this.state.display_date}
                            onChange={this.handleInput}/>
                        <input
                            type="time"
                            className="input"
                            name="time"
                            value={this.state.display_time}
                            onChange={this.handleInput}/>
                    </Field>
                    <Field label="Fecha real" narrow>
                        <input type="date" readOnly className="input" defaultValue={this.state.real_date}/>
                        <input type="time" readOnly className="input" defaultValue={this.state.real_time}/>
                    </Field>
                    <Field label="Copete">
                        <textarea
                            className="textarea"
                            value={this.state.lead}
                            name="lead"
                            onChange={this.handleInput}/>
                    </Field>
                    <Field label="Cuerpo del artículo">
                        <textarea
                            className="textarea"
                            rows="15"
                            name="body"
                            value={this.state.body}
                            onChange={this.handleInput}/>
                    </Field>
                    <Field label="Tags">
                        <input
                            type="text"
                            className="input"
                            name="tags"
                            value={this.state.tags}
                            onChange={this.handleInput}/>
                    </Field>
                    <Field label="Visible">
                        <input
                            name="visible"
                            type="checkbox"
                            value={this.state.visible}
                            onChange={this.handleInput}
                            />
                    </Field>
                </form>
            </div>
        );
    }
}
ArticleCRUD.propTypes = {
    "title": PropTypes.string.isRequired,
    "lead": PropTypes.string.isRequired,
    "body": PropTypes.string.isRequired,
    "tags": PropTypes.string.isRequired,
    "visible": PropTypes.bool,
    "display_date": PropTypes.instanceOf(Date),
    "real_date": PropTypes.instanceOf(Date)
};