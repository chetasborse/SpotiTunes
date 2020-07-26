import { SET_SONG } from "./songType"

export const setSong = (url) => {
    return {
        type: SET_SONG,
        payload: url
    }
} 