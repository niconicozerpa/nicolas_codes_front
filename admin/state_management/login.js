"use strict";

const initial_state = {
    "active_token": sessionStorage.getItem("panelpanelpanel-token"),
    "is_fetching": false
};

export function loginReducer(state, action) {
    switch (action.type) {
        case "start-login":
            return { "is_fetching" : true };
        break;
        case "login-success":
            return {
                "is_fetching": false,
                "active_token": action.token
            };

        break;
        case "login-failed":
            return {
                "is_fetching": false,
                "active_token": null
            };
        break;
        case "logout":
            return {
                "active_token": null,
                "is_fetching": false
            };
        break;
    }

    if (!state) {
        return Object.assign({}, initial_state);
    }
}

export function actionCreatorSuccess(token) {
    sessionStorage.setItem("panelpanelpanel-token", token);
    return {
        "type": "login-success",
        "token": token
    };
}

export function actionCreatorFailed() {
    sessionStorage.removeItem("panelpanelpanel-token");
    return {
        "type": "login-failed"
    };
}

export function actionCreatorLogout() {
    sessionStorage.removeItem("panelpanelpanel-token");
    return {
        "type": "logout"
    }
}

export function actionCreatorStart(username, password) {
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
                dispatch(actionCreatorSuccess(login_results.token));
            } else {
                dispatch(actionCreatorFailed());
            }
        })
        .catch(() => {
            dispatch({ "type": "login-failed" });
        })
    };
}