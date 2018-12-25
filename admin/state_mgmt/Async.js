"use strict";

const initial_state = false;

const ACTION_START = "fetch-start";
const ACTION_END = "fetch-end";

export function asyncReducer(state, action) {
    let output = state ? true : false;

    switch (action.type) {
        case ACTION_START:
            output = true;
            break;
        case ACTION_END:
            output = false;
            break;
    }

    return output;
}

export function createAsyncAction(async_function, action_to_dispatch, handle_error) {
    return function (dispatch) {
        dispatch({ "type": ACTION_START });
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
            dispatch({ "type": ACTION_END });
        })
    };
}