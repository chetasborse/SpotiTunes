import React, {Component} from 'react'
import queryString from 'query-string'
import Sample2 from './Sample2'
import {NavLink, Route} from 'react-router-dom'
import Player from './Player'
import {connect} from "react-redux"
import axios from 'axios'
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

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
            loggedIn: false,
            activeItemIndex: 0,
            children: []
        }
    }

    componentDidMount() {
        this.setState({
            userAccessToken: this.props.token
        })
        
        if(this.props.token) {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${this.props.token}`     
            }
            })
        .then(response => {
            // response.json()
            //     .then(data => {
            //         console.log(data)
                    this.setState({
                        data1: response.data.items,
                        loggedIn: !this.state.loggedIn,
                        activeItemIndex: 0,
                    })

                // })
            
            
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

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    getalbum = (url, id1, id) => {
        this.setState({
            albumurl: url,
            albumid: id,
            albumid1: id1
        })
        // console.log(url)
    }

    render() {
        const exer = this.state.data1.map(individual => 
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
            </div>)

        return(
            <div className="toplookout">        
                { this.state.userAccessToken ?
                <div>

<ItemsCarousel
        // Placeholder configurations
        enablePlaceholder
        numberOfPlaceholderItems={5}

        // Carousel configurations
        numberOfCards={2}
        gutter={12}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={true}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={this.state.activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
      >
        {exer}
      </ItemsCarousel>

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

const mapStateToProps = (state) => {
    return {
        token : state.user.userAccessToken
    }
}

export default connect(mapStateToProps)(Sample1)