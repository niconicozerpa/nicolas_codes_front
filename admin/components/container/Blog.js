"use strict";

import React from "react";
import { connect } from "react-redux";

import { Section } from "../presentational/Section.js";
import { List } from "../presentational/List.js";
import { SpecificBlogArticle } from "../presentational/SpecificBlogArticle.js";

import { action_creators } from "../../state_mgmt/Blog.js";

class BaseBlog extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleEditArticle = this.handleEditArticle.bind(this);
        this.handleSubmitSpecificArticle = this.handleSubmitSpecificArticle.bind(this);
    }

    handleSubmitSpecificArticle(article) {
        if (this.props.specific_article.id) {
            article.id = this.props.specific_article.id;
            this.props.updateSpecificArticle(article, this.props.token);
        } else {
            this.props.saveNewSpecificArticle(article, this.props.token);
        }
    }

    handleLoadMore() {
        this.props.startFetch(this.props.filter, this.props.offset, this.props.token);
    }

    handleFilter(filter) {
        this.props.startNewSearch(filter, this.props.token);
    }
    handleEditArticle(article) {
        this.props.loadSpecificArticle(article.id, this.props.token);
    }

    componentDidMount() {
        this.props.startFetch("", 0, this.props.token);
    }

    render() {
        return (
            <div>
                <Section title="Artículos del blog">
                    <List
                        onFilter={this.handleFilter}
                        onLoadMore={this.handleLoadMore}
                        hasMore={this.props.list_more}
                        hasNewItem
                        onNewItem={this.props.createSpecificArticle}
                        cols={[
                            { "key": "id", "label": "ID" },
                            { "key": "title", "label": "Título" },
                            { "key": "lead", "label": "Bajada" },
                            { "key": "display_date", "label": "Fecha a mostrar" },
                            { "key": "created_at", "label": "Fecha de creación" },
                            { "key": "visible", "label": "Visible" }
                        ]}
                        data={ this.props.articles }
                        actions={
                            [
                                { "label": "Edit", "onClick": this.handleEditArticle }
                            ]
                        }
                    />
                    <SpecificBlogArticle
                        onSubmit={ this.handleSubmitSpecificArticle }
                        article={ this.props.specific_article }
                        onClose={ this.props.unsetSpecificArticle } />
                </Section>
            </div>
        );
    }
}

function mapStateToProps(state, own_props) {
    return {
        "token": state.login.active_token,
        "articles": state.blog.search_results,
        "filter": state.blog.filter,
        "offset": state.blog.offset,
        "list_more": state.blog.list_more,
        "specific_article": state.blog.specific_article
    };
};
function mapDispatchToProps(dispatch, own_props) {
    return {
        "startNewSearch": function (filter, token) {
            dispatch(action_creators.startNewSearch(filter, token));
        },
        "startFetch": function(filter, offset, token) {
            dispatch(action_creators.fetch(filter, offset, token));
        },
        "loadSpecificArticle": function(id, token) {
            dispatch(action_creators.loadSpecificArticle(id, token));
        },
        "unsetSpecificArticle": function() {
             dispatch(action_creators.unsetSpecificArticle());
        },
        "updateSpecificArticle": function(article, token) {
            dispatch(action_creators.updateSpecificArticle(article, token));
        },
        "createSpecificArticle": function() {
            dispatch(action_creators.createSpecificArticle());
        },
        "saveNewSpecificArticle": function(article, token) {
            dispatch(action_creators.saveNewSpecificArticle(article, token));
        }
    };
};

export const Blog = connect(mapStateToProps, mapDispatchToProps)(BaseBlog);