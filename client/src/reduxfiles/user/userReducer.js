const { GET_ACCESS_TOKEN } = require("./userType")
const querystring = require('querystring')

const InitialState = {
    userAccessToken: '',
    isLoggedIn: false
}

const userReducer = (state = InitialState, action) => {
    switch(action.type) {
        case GET_ACCESS_TOKEN:
            return {
                ...state,
                userAccessToken: action.payload,
                isLoggedIn: true
            }
        default:
            return state
    }
}

export default userReducer