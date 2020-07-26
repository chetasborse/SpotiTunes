import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import ItemsCarousel from 'react-items-carousel';
import Sample2 from './Sample2';
import {Col, Row, Button} from 'reactstrap'
import './MyTunes.css'
import IndiPlaylist from './IndiPlaylist';
import { setSong } from '../reduxfiles/song/songActions';
 
class MyTunes extends Component {

    constructor() {
        super()
        this.state = {
            playlists: [],
            songs:[],
            errmsgplaylist: '',
            activeItemIndex: 0,
            activeItemIndex1: 0,
            currentPlaylist: '',
            recentlyplayed: [],
            errmsgrecently:''
        }
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        if(this.props.token) {
            axios.get("https://api.spotify.com/v1/me/playlists", config)
            .then(response => {
                this.setState({
                    playlists: response.data.items
                })
            })
            .catch(err => {
                this.setState({
                    errmsgplaylist: 'Unable to retrieve the playlist'
                })
            })

            axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", config)
            .then(response => {
                this.setState({
                    recentlyplayed: response.data.items
                })
            })
            .catch(err => {
                this.setState({
                    errmsgrecently: 'Unable to retrieve the playlist'
                })
            })

        }
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
    changeActiveItem1 = (activeItemIndex1) => this.setState({ activeItemIndex1 });

    render() {

        const playlists = this.state.playlists.map(individual => 
            <div className="playlistcar" key={individual.id}>
                <Row>
                    <Col><p className="playlisttitle">{individual.name}</p></Col>
                </Row>
                <Row>
                    <Col>{ individual.images[1] !== undefined ? <img src={individual.images[1].url}></img> : null }</Col>
                </Row>
                <Row>
                <Col>
                <p>No. of Tracks: {individual.tracks.total}</p>
                <IndiPlaylist url={individual.tracks.href} titlePlaylist={individual.name} id={individual.id} stats="playlist"/>
                {/* <Button color="danger" onClick={() => this.seturl(individual.tracks.href, individual.id)}>View Playlist</Button>
                { (this.state.data2 && this.state.id === individual.id) ? 
                    this.state.data2.map(indi => 
                    <div key={indi.track.id}>
                        <img src={indi.track.album.images[2].url}></img>
                        <p onClick= {() => this.getalbum(indi.track.album.href, indi.track.album.id, individual.id)}>{indi.track.album.name}</p>
                        { this.state.albumid === individual.id && this.state.albumid1 === indi.track.album.id ? <Sample2 url={this.state.albumurl} token={this.state.userAccessToken}></Sample2> : null}
                        <p>Song: {indi.track.name}</p>
                        <p>Artist: {indi.track.album.artists[0].name}</p>
                    </div>) : null
                } */}
                </Col>
                </Row>
            </div>)

        const recentlyplayed = this.state.recentlyplayed.map(individual =>
            <div className="playlistcar" key={individual.track.id}>
                <Row>
                    <Col>
                        <img style={{height: '120px'}} src={individual.track.album.images[1].url}></img>
                    </Col>
                </Row>
                <Row>
                    <Col><p className="playlisttitle">{individual.track.name}</p></Col>
                </Row>
                <Row>
                    <Col><p className="songContents" style={{textAlign:'center'}}>Artist: {individual.track.album.artists[0].name}</p></Col>
                </Row>
                <Row>
                    <Col><p className="songContents" style={{textAlign:'center'}}>Album: {individual.track.album.name}</p></Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="warning" onClick={() => this.props.setSong(individual.track.preview_url)}>Play</Button>
                    </Col>
                    <Col>
                        <IndiPlaylist url={individual.track.album.href} titlePlaylist={individual.track.album.name} id={individual.id} stats="album"/>
                    </Col>
                </Row>
            </div>
            )

        return(
            <div className="toplookout">
                <div>
                <h4 className="playListHead">My PlayLists</h4>
                {
                    this.props.token ? 

                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={3}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem}
                        activeItemIndex={this.state.activeItemIndex}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {playlists}
                    </ItemsCarousel>
                    : null
                }
                <h4 className="playListHead">Recently Played</h4>
                {
                    this.props.token ? 
                    <div style={{marginBottom: '100px'}}>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={5}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem1}
                        activeItemIndex={this.state.activeItemIndex1}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {recentlyplayed}
                    </ItemsCarousel>
                    </div>
                    : null
                }
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        token: state.user.userAccessToken,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(MyTunes)