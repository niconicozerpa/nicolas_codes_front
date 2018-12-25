"use strict";

import { createAsyncAction } from "./Async.js";

const initial_state = {
    "form_list": [],
    "form_list_more": false,
    "specific_form": null,
    "offset": 0,
    "filter": ""
};

const ACTION_RESET = "form-reset";
const ACTION_SET_FILTER = "form-set-filter";
const ACTION_SET_SPECIFIC_FORM = "form-set-specific-form";
const ACTION_UNSET_SPECIFIC_FORM = "form-unset-specific-form";
const ACTION_SET_SEARCH_RESULTS = "form-set-search-results";

export function contactFormReducer(state, action) {
    if (!state) {
        state = Object.assign({}, initial_state);
    }
    let new_state = Object.assign({}, state);
    
    switch (action.type) {
        case ACTION_RESET:
            new_state = Object.assign({}, initial_state);
        break;
        case ACTION_SET_FILTER:
            new_state.filter = action.filter;
        break;

        case ACTION_SET_SPECIFIC_FORM:
            new_state.specific_form = action.specific_form;
        break;

        case ACTION_SET_SEARCH_RESULTS:
            new_state.form_list = state.form_list.concat(action.items);
            new_state.form_list_more = action.more_items_available;
            new_state.offset = action.offset + action.items.length;
        break;

        case ACTION_UNSET_SPECIFIC_FORM:
            new_state.specific_form = null;
        break;
    }
    return new_state;
}

export const action_creators = {
    "startNewSearch": function(filter, token) {
        return (dispatch) => {
            dispatch({ "type": ACTION_RESET });
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
                
                const url = new URL(`${SERVICE_BASE_URL}/contact-form-entries`);
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
                    "items": response.items,
                    "offset": offset,
                    "more_items_available":  response.more_items_available
                });
            },
            null
        );
    },

    "loadSpecificForm": function(id, token) {
        return createAsyncAction(
            function (dispatch) {
                return fetch(
                    `${SERVICE_BASE_URL}/contact-form-entries?id=${id}`,
                    {
                        "headers": {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                .then(response => response.json())
                .then(function (response) {
                    if (response.id) {
                        return response;
                    } else {
                        throw "Error";
                    }
                });
            },
            function(dispatch, response) {
                dispatch({
                    "type": ACTION_SET_SPECIFIC_FORM,
                    "specific_form": response
                });
            }
        );
    },

    "unloadSpecificForm": function() {
        return { "type": ACTION_UNSET_SPECIFIC_FORM };
    }
};