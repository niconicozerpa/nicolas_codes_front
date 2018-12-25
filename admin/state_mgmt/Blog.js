"use strict";

import { createAsyncAction } from "./Async.js";

const ACTION_RESET_FILTER = "blog-reset-filter";
const ACTION_SET_FILTER = "blog-set-filter";
const ACTION_SET_SPECIFIC_ARTICLE = "blog-set-specific-article";
const ACTION_UNSET_SPECIFIC_ARTICLE = "blog-unset-specific-article";
const ACTION_SET_SEARCH_RESULTS = "blog-set-search-results";

const initial_state = {
    "filter": "",
    "specific_article": null,
    "offset": 0,
    "search_results": [],
    "list_more": false
};

export function blogReducer(state, action) {
    if (!state) {
        state = initial_state;
    }
    const new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case ACTION_RESET_FILTER:
            new_state.search_results = [];
            new_state.filter = action.filter;
            break;
    
        case ACTION_SET_FILTER:
            new_state.filter = action.filter;
            break;
        
        case ACTION_SET_SPECIFIC_ARTICLE:
            new_state.specific_article = JSON.parse(JSON.stringify(action.article));
            break;
        
        case ACTION_UNSET_SPECIFIC_ARTICLE:
            new_state.specific_article = null;
            break;

        case ACTION_SET_SEARCH_RESULTS:
            new_state.search_results = new_state.search_results.concat(action.search_results);
            new_state.list_more = action.more_items_available;
            new_state.offset = action.offset + action.search_results.length;
            
            break;
    }
    
    return new_state;
}

export const action_creators = {
    "startNewSearch": function(filter, token) {
        return (dispatch) => {
            dispatch({ "type": ACTION_RESET_FILTER });
            return this.fetch(filter, 0, token)(dispatch);
        }
    },
    "fetch": function (filter, offset, token) {

        return createAsyncAction(
            function(dispatch) {
                dispatch({
                    "type": ACTION_SET_FILTER,
                    "filter": filter
                });
                
                const url = new URL(`${SERVICE_BASE_URL}/list-blog-articles-private`);
                url.searchParams.append("offset", parseInt(offset));
                url.searchParams.append("q", filter);

                return fetch(
                    url,
                    {
                        "headers": {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(response => response.json());
            },
            function(dispatch, response) {
                dispatch({
                    "type": ACTION_SET_SEARCH_RESULTS,
                    "search_results": response.results,
                    "offset": offset,
                    "more_items_available":  response.more_items_available
                });
            },
            null
        );
    },
    "loadSpecificArticle": function(id, token) {
        return createAsyncAction(
            function(dispatch) {
                const url = new URL(`${SERVICE_BASE_URL}/get-blog-article-private`);
                url.searchParams.append("id", parseInt(id));

                return fetch(
                    url,
                    {
                        "headers": {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(response => response.json());
            },
            function (dispatch, response) {
                if (response.id) {
                    dispatch({
                        "type": ACTION_SET_SPECIFIC_ARTICLE,
                        "article": response
                    });
                }
            }
        );
    },
    "unsetSpecificArticle": function() {
        return { "type": ACTION_UNSET_SPECIFIC_ARTICLE };
    },
    "updateSpecificArticle": function(article, token) {
        
        return createAsyncAction(function() {
            const url = new URL(`${SERVICE_BASE_URL}/update-blog-article`);
            return fetch(
                url,
                {
                    "method": "POST",
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(article)
                }
            )
            .then(response => response.json());
        }, (dispatch, response) => {
            if (response && response.code == 200) {
                dispatch({ "type": ACTION_UNSET_SPECIFIC_ARTICLE });
                dispatch(this.startNewSearch("", token));
            } else {
                alert("Update failed");
            }
        });
    },
    "createSpecificArticle": function() {
        return {
            "type": ACTION_SET_SPECIFIC_ARTICLE,
            "article": {
                "title": "",
                "lead": "",
                "body": ""
            }
        };
    },
    "saveNewSpecificArticle": function(article, token) {
        return createAsyncAction(function() {
            const url = new URL(`${SERVICE_BASE_URL}/create-blog-article`);
            return fetch(
                url,
                {
                    "method": "POST",
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(article)
                }
            )
            .then(response => response.json());
        }, (dispatch, response) => {
            if (response && response.code == 200) {
                dispatch({ "type": ACTION_UNSET_SPECIFIC_ARTICLE });
                dispatch(this.startNewSearch("", token));
            } else {
                alert("Create failed");
            }
        });
    } 
};