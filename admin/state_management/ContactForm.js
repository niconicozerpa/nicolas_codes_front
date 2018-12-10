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
    
    switch (action.type) {
        case "start-fetching":
            return { "is_fetching": true };
        break;
    }

    return state;
}

export const action_creators = {
    "a": "a"
};
