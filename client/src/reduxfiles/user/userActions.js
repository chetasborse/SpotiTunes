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
                payload: {image: response.data.images[con].url, name: response.data.display_name, email: response.data.email, id: response.data.id}
            })
        })
        .catch(err => {
            let authoptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: localStorage.getItem('refresh_token')
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(
                      'f0bbdb786c6e4f42bdcd954092d0c1cf' + ':' + 'b25757a750f848baaba1a34d033c06c3'
                    ).toString('base64'))
                },
                json: true
            }
            axios.post(authoptions, function(error, response, body) {
                var access_token = body.access_token
                localStorage.removeItem('token')
                localStorage.removeItem('refresh_token')
                localStorage.addItem('token', access_token)
                localStorage.addItem('refresh_token', body.refresh_token)
                window.location.reload()               
              })
        })
        
}