"use strict";
import React from "react";
import { connect } from "react-redux";
import { action_creators } from "../../state_management/ContactForm.js";
import { Section } from "../presentational/Section.js";
import { List } from "../presentational/List.js";
import { SpecificForm } from "../presentational/SpecificForm.js";
import { Loading } from "../presentational/Loading.js"


class BaseContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.onLoadMore = this.onLoadMore.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.viewMessage = this.viewMessage.bind(this);
    }
    componentDidMount() {
        this.props.startFetch(this.props.filter, this.props.offset, this.props.token);
    }
    
    onLoadMore() {
        this.props.startFetch(this.props.filter, this.props.offset, this.props.token);
    }

    onFilter(filter) {
        this.props.setFilter(filter, this.props.token);
    }

    viewMessage(specific_form) {
        if (!this.props.is_fetching) {
            this.props.loadSpecificForm(specific_form.id, this.props.token);
        }
    }

    render() {
        
        const data = [];
        for(let item of this.props.items) {
            data.push(item);
        }

        return (
            <div>
                <Loading loading={this.props.is_fetching}/>
                <SpecificForm
                    form={this.props.specific_form}
                    onClose={this.props.unloadSpecificForm}/>
                <Section title="Formulario de contacto">
                    <List cols={[
                        { "key": "id", "label": "ID" },
                        { "key": "full_name", "label": "Nombre" },
                        { "key": "location", "label": "Ubicación" },
                        { "key": "website", "label": "Website" },
                        { "key": "email", "label": "Email" },
                        { "key": "created_at", "label": "Fecha" }
                    ]}
                    hasMore={this.props.has_more_items}
                    onLoadMore={this.onLoadMore}
                    actions={[{
                        "label": "Ver mensaje",
                        "onClick": this.viewMessage
                    }]}
                    loading={this.props.is_fetching}
                    onFilter={this.onFilter}
                    data={data}/>
                </Section>
            </div>
        );
    }
}


function mapStateToProps(state, own_props) {
    return {
        "token": state.login.active_token,
        "items": state.contact_form.form_list,
        "has_more_items": state.contact_form.form_list_more,
        "is_fetching": state.contact_form.is_fetching,
        "offset": state.contact_form.offset,
        "filter": state.contact_form.filter,
        "specific_form": state.contact_form.specific_form
    };
}

function mapDispatchToProps(dispatch, own_props) {
    return {
        "startFetch": (filter, offset, token) => {
            dispatch(action_creators.fetch(filter, offset, token));
        },
        "setFilter": (filter, token) => {
            dispatch(action_creators.startNewSearch(filter, token));
        },
        "loadSpecificForm": (id, token) => {
            dispatch(action_creators.loadSpecificForm(id, token));
        },
        "unloadSpecificForm": () => {
            dispatch(action_creators.unloadSpecificForm());
        }
    };
}
export const ContactForm = connect(mapStateToProps, mapDispatchToProps)(BaseContactForm);