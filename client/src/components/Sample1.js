import React, {Component} from 'react'
import queryString from 'query-string'
import Sample2 from './Sample2'
import {NavLink, Route} from 'react-router-dom'
import Player from './Player'

class Sample1 extends Component {

    constructor() {
        super()
        this.state = {
            data1: [],
            data2:[],
            url: '',
            id: '',
            albumid: '',
            albumid1: '',
            albumurl: '',
            userAccessToken: '',
            loggedIn: false
        }
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search)
        let access_token = parsed.access_token
        this.setState({
            userAccessToken: access_token
        })
        
        if(access_token) {
        fetch("https://api.spotify.com/v1/me/playlists", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`     
            }
            })
        .then(response => {
            response.json()
                .then(data => {
                    console.log(data)
                    this.setState({
                        data1: data.items,
                        loggedIn: !this.state.loggedIn
                    })

                })
            
            
        })
        .catch(err => 
            {
                console.log('Error occ')
                this.setState({
                    loggedIn: false
                })
        })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.url !== this.state.url) {
                fetch(this.state.url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.state.userAccessToken}`     
                }
                })
            .then(response => {
                response.json()
                    .then(data => {
                        this.setState({
                            data2: data.items
                        })
                    })
                
                
            })
            .catch(err => console.log('Error occ'))
        }
    }

    seturl = (url, id) => {
        this.setState({
            url: url,
            id: id
        })
    }

    getalbum = (url, id1, id) => {
        this.setState({
            albumurl: url,
            albumid: id,
            albumid1: id1
        })
        // console.log(url)
    }

    // componentDidUpdate(prevState) {

    //     if(prevState.userAccessToken != queryString.parse(window.location.search).access_token) {
    //         let parsed = queryString.parse(window.location.search)
    //         let access_token = parsed.access_token
    //         this.setState({
    //             userAccessToken: access_token
    //         })
            

    //         fetch("https://api.spotify.com/v1/me/playlists", {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${access_token}`     
    //             }
    //             })
    //         .then(response => {
    //             response.json()
    //                 .then(data => {
    //                     console.log(data)
    //                     this.setState({
    //                         data1: data.items
    //                     })
    //                 })
                
                
    //         })
    //         .catch(err => console.log('Error occ'))
    //     }
    // }

    render() {
        return(
            <div >        
                { this.state.userAccessToken ?
                <div>{this.state.data1.map(individual => 
                    <div key={individual.id}>
                        <p>{individual.name}</p>
                        { individual.images[1] !== undefined ? <img src={individual.images[1].url}></img> : null }
                        <p>No. of Tracks: {individual.tracks.total}</p>
                        <button onClick={() => this.seturl(individual.tracks.href, individual.id)}>Checkout</button>
                        { (this.state.data2 && this.state.id === individual.id) ? 
                            this.state.data2.map(indi => 
                            <div key={indi.track.id}>
                                <img src={indi.track.album.images[2].url}></img>
                                <p onClick= {() => this.getalbum(indi.track.album.href, indi.track.album.id, individual.id)}>{indi.track.album.name}</p>
                                { this.state.albumid === individual.id && this.state.albumid1 === indi.track.album.id ? <Sample2 url={this.state.albumurl} token={this.state.userAccessToken}></Sample2> : null}
                                <p>Song: {indi.track.name}</p>
                                <p>Artist: {indi.track.album.artists[0].name}</p>
                            </div>) : null
                        }
                    </div>)}
                </div> : null
                }


                {/* {   this.state.userAccessToken ?
                    <SpotifyPlayer
                    token= {this.state.userAccessToken}
                    uris={['spotify:album:63jrLuBlHcMN7MUbjbJ4LI']}
                    /> : null
                } */}
                {/* <Player /> */}
            </div>
        )
    }
}

export default Sample1