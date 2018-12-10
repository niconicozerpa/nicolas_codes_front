"use strict";

const initial_state = {
    "is_fetching": false,
    "form_list": [],
    "form_list_more": false,
    "specific_form": null
};

export function contactFormReducer(state, action) {
    if (!state) {
        state = Object.assign({}, initial_state);
    }
    const new_state = Object.assign({}, state);
    
    switch (action.type) {
        case "start-fetching":
            new_state.is_fetching = true;
        break;

        case "end-fetching":
            new_state.is_fetching = false;
            new_state.form_list = action.items;
            new_state.form_list_more = action.more_items_available;
        break;

        case "fail-fetching":
            new_state.is_fetching = false;
        break;
    }
    return new_state;
}

export const action_creators = {
    "fetch": function (filter, token) {
        return function (dispatch) {
            dispatch({ "type": "start-fetching" });
            
            fetch(
                `${SERVICE_BASE_URL}/contact-form-entries`,
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
                        "type": "end-fetching",
                        "items": response.items,
                        "more_items_available":  response.more_items_available
                    });
                } else {
                    dispatch({ "type": "fail-fetching" });
                }
            })
            .catch(function() {
                dispatch({ "type": "fail-fetching" });
            });
        }
    }
};
