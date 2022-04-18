const initialState = {
    isAuthenticated: true,
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case "IS_AUTHENTICATED":
            return { ...state, isAuthenticated: true }
        case "NOT_AUTHENTICATED":
            return { ...state, isAuthenticated: false }
        case "RESET_AUTHENTICATION":
            return { ...state, isAuthenticated: false }
        default:
            return state;
    }
}

export default authReducer;