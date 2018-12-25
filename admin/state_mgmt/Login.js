"use strict";

const ACTION_START = "login-start";
const ACTION_SUCCEEDED = "login-succeded";
const ACTION_FAILED = "login-failed";
const ACTION_LOGOUT = "login-logout";

const initial_state = {
    "active_token": sessionStorage.getItem("panelpanelpanel-token"),
    "is_fetching": false
};

export function loginReducer(state, action) {
    const new_state = Object.assign({}, state ? state : initial_state);
    switch (action.type) {
        case ACTION_START:
            new_state.is_fetching = true;
        break;
        case ACTION_SUCCEEDED:
            new_state.is_fetching = false;
            new_state.active_token = action.token;

        break;
        case ACTION_FAILED:
            new_state.is_fetching = false;
            new_state.active_token = null;
        break;
        case ACTION_LOGOUT:
            new_state.active_token = null;
        break;
    }

    return new_state;
}

export const action_creators = {
    "success": function(token) {
        sessionStorage.setItem("panelpanelpanel-token", token);
        return {
            "type": ACTION_SUCCEEDED,
            "token": token
        };
    },
    "failed": function() {
        sessionStorage.removeItem("panelpanelpanel-token");
        return {
            "type": ACTION_FAILED
        };
    },
    "logout": function() {
        sessionStorage.removeItem("panelpanelpanel-token");
        return {
            "type": ACTION_LOGOUT
        }
    },
    "start": function(username, password) {
        return (dispatch) => {
            dispatch({ "type": ACTION_START });
            
            fetch(
                `${SERVICE_BASE_URL}/login`,
                {
                    "method": "POST",
                    "body": JSON.stringify({
                        "username": username,
                        "password": password
                    }),
                    "headers": {
                        "Content-Type": "application/json"
                    }
                } 
            )
            .then(response => response.json())
            .then(login_results => {
                if (login_results.token) {
                    dispatch(action_creators.success(login_results.token));
                } else {
                    dispatch(action_creators.failed());
                }
            })
            .catch(() => {
                dispatch({ "type": ACTION_FAILED });
            })
        };
    }
};