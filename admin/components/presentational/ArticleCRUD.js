"use strict";
import React from "react";

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

export class ArticleCRUD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": props.title ? props.title : "",
            "lead": props.lead ? props.lead : "",
            "body": props.body ? props.body : "",
            "tags": props.tags ? props.tags : "",
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
                        <input type="date" className="input"/>
                        <input type="time" className="input"/>
                    </Field>
                    <Field label="Fecha real" narrow>
                        <input type="date" readOnly className="input"/>
                        <input type="time" className="input"/>
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
                </form>
            </div>
        );
    }
}