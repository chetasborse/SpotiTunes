import { SET_SONG, ADD_SONG, ARTIST_MODAL, GET_PLAYLIST, SET_PLAY, ADDED } from "./songType"
import axios from "axios"

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

export const getPlaylist = () => dispatch => {
    const token = localStorage.getItem('token')
        if(token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get("https://api.spotify.com/v1/me/playlists", config)
            .then(response => {
                dispatch({
                    type: GET_PLAYLIST,
                    payload: response.data.items
                })
                const obj = {};
                const arr = response.data.items
                for(let i = 0; i < arr.length; i++) {
                    obj[arr[i].name] = arr[i].id
                }
                dispatch({
                    type: SET_PLAY,
                    payload: obj
                })
            })
            // .catch(err => {
            //     // this.setState({
            //     //     errmsgplaylist: 'Unable to retrieve the playlist',
            //     //     playlistsloading: false
            //     // })
            // })
        }
}

export const addtoplaylist = (urlsi) => dispatch => {
    const token = localStorage.getItem('token')
        
        if(token) {
        const config = {
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json", 
                "Content-Length": "0",
                Authorization: 'Bearer ' + token   
            }
            
        }
        const config1 = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        
        axios.post(urlsi, {} ,config)
            .then(res => {
                alert('Added the song Successfully')
                axios.get("https://api.spotify.com/v1/me/playlists", config1)
                .then(response => {
                    dispatch({
                        type: GET_PLAYLIST,
                        payload: response.data.items
                    })
                })
            }
            )
            .catch(err => dispatch({
                type:ADDED,
                payload: false
            }))
    }
}

export const deleteplaylistitem = (url, uri) => dispatch => {
    const token = localStorage.getItem('token')
        
        if(token) {
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: 'Bearer ' + token   
            },
            data: {
                "tracks": [{
                    "uri": uri
                }]
            }   
        }
        const config1 = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        axios.delete(url, config)
            .then(res=> {
                alert('Song removed from playlist successfully')
                axios.get("https://api.spotify.com/v1/me/playlists", config1)
                .then(response => {
                    dispatch({
                        type: GET_PLAYLIST,
                        payload: response.data.items
                    })
                })
            })
            .catch(err=> {
                alert('Error')
            })
    }
}

export const createnewplaylist = (name, id) => dispatch => {
    const token = localStorage.getItem('token')
    if(token) {
        const url = `https://api.spotify.com/v1/users/${id}/playlists`
        const data = {
            name: name
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            }
        }
        const config1 = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        axios.post(url, data ,config)
            .then(res => {
                alert("Created playlist successfully")
                axios.get("https://api.spotify.com/v1/me/playlists", config1)
                .then(response => {
                    dispatch({
                        type: GET_PLAYLIST,
                        payload: response.data.items
                    })
                })
            })
            .catch(err => {
                alert("Error")
            })
    }
}

 // axios.get("https://api.spotify.com/v1/me/playlists", config1)
                // .then(response => {
                //     dispatch({
                //         type: GET_PLAYLIST,
                //         payload: response.data.items
                //     })
                // })