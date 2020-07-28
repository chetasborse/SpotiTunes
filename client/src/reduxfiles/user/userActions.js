import { GET_ACCESS_TOKEN, SET_USER } from "./userType"
import axios from 'axios'

export const getAccessToken = (token) => {
    return {
        type: GET_ACCESS_TOKEN,
        payload: token
    }
}

export const getInfo = () => dispatch =>{
    const token = localStorage.getItem('token')
    axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const con = 0
            dispatch({
                type: SET_USER,
                payload: {image: response.data.images[con].url, name: response.data.display_name, email: response.data.email}
            })
        })
        .catch(err => {
            this.setState({
                msg: 'Error in retrieving information'
            })
        })
        
}