"use strict";

const initial_state = {
    "is_fetching": false,
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
        case "form-start-fetching":
            new_state.is_fetching = true;
            if (action.filter) {
                new_state.filter = action.filter;
            }
        break;

        case "form-end-fetching-specific-form":
            new_state.is_fetching = false;
            new_state.specific_form = action.specific_form
        break;

        case "form-end-fetching":
            new_state.is_fetching = false;
            new_state.form_list = state.form_list.concat(action.items);
            new_state.form_list_more = action.more_items_available;
            new_state.offset = action.offset + action.items.length;
        break;

        case "form-fail-fetching":
            new_state.is_fetching = false;
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
        return function (dispatch) {
            dispatch({
                "type": "form-start-fetching",
                "filter": filter
            });
            
            const url = new URL(`${SERVICE_BASE_URL}/contact-form-entries`);
            url.searchParams.append("offset", parseInt(offset));
            url.searchParams.append("q", filter);

            fetch(
                url,
                {
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(response => response.json())
            .then(function (response) {
                if (response.items) {
                    dispatch({
                        "type": "form-end-fetching",
                        "items": response.items,
                        "offset": offset,
                        "more_items_available":  response.more_items_available
                    });
                } else {
                    dispatch({ "type": "form-fail-fetching" });
                }
            })
            .catch(function() {
                dispatch({ "type": "form-fail-fetching" });
            });
        }
    },

    "loadSpecificForm": function(id, token) {
        return function(dispatch) {
            dispatch({ "type": "form-start-fetching" });

            fetch(
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
                    dispatch({
                        "type": "form-end-fetching-specific-form",
                        "specific_form": response
                    });
                } else {
                    dispatch({ "type": "form-fail-fetching" });
                }
            })
            .catch(function() {
                dispatch({ "type": "form-fail-fetching" });
            });
        }
    },

    "unloadSpecificForm": function() {
        return { "type": "form-unload-specific-form" };
    }
};