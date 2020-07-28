const { SET_SONG, ADD_SONG, ARTIST_MODAL, GET_PLAYLIST, SET_PLAY, ADDED } = require("./songType")

const dummy = {
    preview_url: '',
    image: '',
    song: '',
    album: ''
}

const initialState = {
    songurl: '',
    songsPreviewed: [],
    currSong: dummy,
    myplaylist: [],
    playlist: {}
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
        case ARTIST_MODAL: 
            return {
                ...state,
                artistModal: !state.artistModal
            }
        
        case GET_PLAYLIST:
            return {
                ...state,
                myplaylist: action.payload
            }
        case SET_PLAY:
            return {
                ...state,
                playlist: action.payload
            }
        case ADDED:
            return {
                ...state
            }
        default:
            return state
    }
}

export default songReducer