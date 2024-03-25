const initialState = {
    login_status: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_STATUS':
            return {
                ...state,
                login_status: action.login_status
            }
        default:
            return state;
    }
};

export default loginReducer;