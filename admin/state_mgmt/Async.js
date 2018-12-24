"use strict";

const initial_state = false;

export function asyncReducer(state, action) {
    let output = state ? true : false;

    switch (action.type) {
        case "fetch-start":
            output = true;
            break;
        case "fetch-end":
            output = false;
            break;
    }

    return output;
}

export function createAsyncAction(async_function, action_to_dispatch, handle_error) {
    return function (dispatch) {
        dispatch({ "type": "fetch-start" });
        return async_function(dispatch)
        .then(function() {
            action_to_dispatch(dispatch, ...arguments);
        })
        .catch(function() {
            if(handle_error) {
                handle_error(dispatch, ...arguments);
            }
        })
        .finally(function() {
            dispatch({ "type": "fetch-end" });
        })
    };
}