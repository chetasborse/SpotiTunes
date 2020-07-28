const { GET_ACCESS_TOKEN, SET_USER } = require("./userType")
const querystring = require('querystring')

const InitialState = {
    userAccessToken: '',
    isLoggedIn: false,
    userInfo: {}
}

const userReducer = (state = InitialState, action) => {
    switch(action.type) {
        case GET_ACCESS_TOKEN:
            return {
                ...state,
                userAccessToken: action.payload,
                isLoggedIn: true
            }
        case SET_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state
    }
}

export default userReducer