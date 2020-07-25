import { GET_ACCESS_TOKEN } from "./userType"

export const getAccessToken = (token) => {
    return {
        type: GET_ACCESS_TOKEN,
        payload: token
    }
}