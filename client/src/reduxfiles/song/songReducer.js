const { SET_SONG } = require("./songType")

const initialState = {
    songurl: ''
}

const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SONG:
            return {
                ...state,
                songurl: action.payload
            }
        default:
            return state
    }
}

export default songReducer