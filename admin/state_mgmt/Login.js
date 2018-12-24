"use strict";

const initial_state = {
    "active_token": sessionStorage.getItem("panelpanelpanel-token"),
    "is_fetching": false
};

export function loginReducer(state, action) {
    const new_state = Object.assign({}, state ? state : initial_state);
    switch (action.type) {
        case "start-login":
            new_state.is_fetching = true;
        break;
        case "login-success":
            new_state.is_fetching = false;
            new_state.active_token = action.token;

        break;
        case "login-failed":
            new_state.is_fetching = false;
            new_state.active_token = null;
        break;
        case "logout":
            new_state.active_token = null;
        break;
    }

    return new_state;
}

export const action_creators = {
    "success": function(token) {
        sessionStorage.setItem("panelpanelpanel-token", token);
        return {
            "type": "login-success",
            "token": token
        };
    },
    "failed": function() {
        sessionStorage.removeItem("panelpanelpanel-token");
        return {
            "type": "login-failed"
        };
    },
    "logout": function() {
        sessionStorage.removeItem("panelpanelpanel-token");
        return {
            "type": "logout"
        }
    },
    "start": function(username, password) {
        return (dispatch) => {
            dispatch({ "type": "start-login" });
            
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
                dispatch({ "type": "login-failed" });
            })
        };
    }
};