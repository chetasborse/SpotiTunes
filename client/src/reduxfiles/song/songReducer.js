const { SET_SONG, ADD_SONG, ARTIST_MODAL } = require("./songType")

const dummy = {
    preview_url: '',
    image: '',
    song: '',
    album: ''
}

const initialState = {
    songurl: '',
    songsPreviewed: [],
    currSong: dummy
}

const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SONG:
            return {
                ...state,
                songurl: action.payload
            }
        case ADD_SONG:
            const item = action.payload
            item.id = Date.now
            return {
                ...state,
                songsPreviewed: [item, ...state.songsPreviewed],
                currSong: item
            }
        case ARTIST_MODAL: {
            return {
                ...state,
                artistModal: !state.artistModal
            }
        }
        default:
            return state
    }
}

export default songReducer