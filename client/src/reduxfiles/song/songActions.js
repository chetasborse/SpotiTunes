import { SET_SONG, ADD_SONG, ARTIST_MODAL } from "./songType"

export const setSong = (item) => dispatch => {
    dispatch({
        type: SET_SONG,
        payload: item.preview_url
    })
    dispatch({
        type: ADD_SONG,
        payload: item
    })
} 
