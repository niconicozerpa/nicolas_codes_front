"use strict";

import { createAsyncAction } from "./Async.js";

const initial_state = {
    "form_list": [],
    "form_list_more": false,
    "specific_form": null,
    "offset": 0,
    "filter": ""
};

export function contactFormReducer(state, action) {
    if (!state) {
        state = Object.assign({}, initial_state);
    }
    let new_state = Object.assign({}, state);
    
    switch (action.type) {
        case "form-reset":
            new_state = Object.assign({}, initial_state);
        break;
        case "form-set-filter":
            new_state.filter = action.filter;
        break;

        case "form-end-fetching-specific-form":
            new_state.is_fetching = false;
            new_state.specific_form = action.specific_form
        break;

        case "form-set-search-results":
            new_state.form_list = state.form_list.concat(action.items);
            new_state.form_list_more = action.more_items_available;
            new_state.offset = action.offset + action.items.length;
        break;

        case "form-unload-specific-form":
            new_state.specific_form = null;
        break;
    }
    return new_state;
}

export const action_creators = {
    "startNewSearch": function(filter, token) {
        return (dispatch) => {
            dispatch({ "type": "form-reset" });
            return this.fetch(filter, 0, token)(dispatch);
        }
    },
    "fetch": function (filter, offset, token) {

        return createAsyncAction(
            function(dispatch) {
                dispatch({
                    "type": "form-set-filter",
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
                    "type": "form-set-search-results",
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
                    "type": "form-end-fetching-specific-form",
                    "specific_form": response
                });
            }
        );
    },

    "unloadSpecificForm": function() {
        return { "type": "form-unload-specific-form" };
    }
};