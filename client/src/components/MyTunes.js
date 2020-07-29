import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import ItemsCarousel from 'react-items-carousel';
import {Col, Row, Button, Spinner} from 'reactstrap'
import './MyTunes.css'
import IndiPlaylist from './IndiPlaylist';
import { setSong, createnewplaylist, } from '../reduxfiles/song/songActions';
import Album from './Album';
 
class MyTunes extends Component {

    constructor() {
        super()
        this.state = {
            playlists: [],
            songs:[],
            errmsgplaylist: '',
            activeItemIndex: 0,
            activeItemIndex1: 0,
            activeItemIndex2: 0,
            currentPlaylist: '',
            recentlyplayed: [],
            errmsgrecently:'',
            playlistsloading: false,
            recentlyloading: true
        }
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }

        if(this.props.token) {
            // axios.get("https://api.spotify.com/v1/me/playlists", config)
            // .then(response => {
            //     this.setState({
            //         playlists: response.data.items,
            //         playlistsloading: false
            //     })
            // })
            // .catch(err => {
            //     this.setState({
            //         errmsgplaylist: 'Unable to retrieve the playlist',
            //         playlistsloading: false
            //     })
            // })

            axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", config)
            .then(response => {
                this.setState({
                    recentlyplayed: response.data.items,
                    recentlyloading: false
                })
            })
            .catch(err => {
                this.setState({
                    errmsgrecently: 'Unable to retrieve the playlist',
                    recentlyloading: false
                })
            })

        }
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
    changeActiveItem1 = (activeItemIndex1) => this.setState({ activeItemIndex1 });
    changeActiveItem2 = (activeItemIndex2) => this.setState({ activeItemIndex2 });

    seturl = (item) => {
        if(item.preview_url)
            this.props.setSong(item)
        else
            alert('No preview available')
    }

    createnew = () => {
        const name = prompt("Enter name of your new playlist :)")
        this.props.createnewplay(name, this.props.userid)
    }

    render() {

        const playlists = this.props.myplaylist.map(individual => 
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
                        {individual.track.album.images ? <img style={{height: '200px'}} src={individual.track.album.images[1].url}></img> : null}
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
                        <Button color="warning" onClick={() => this.seturl({preview_url: individual.track.preview_url, album: individual.track.album.name, song: individual.track.name, image: individual.track.album.images[1].url})}>Play</Button>
                    </Col>
                    <Col>
                        <Album url={individual.track.album.href} titlePlaylist={individual.track.album.name} id={individual.id} stats="album"/>
                    </Col>
                </Row>
            </div>
            )

            const recentlypreviewed = this.props.songspreviewed.map(individual =>
                <div className="playlistcar" key={individual.id}>
                    <Row>
                        <Col>
                            {individual.image ? <img style={{height: '200px'}} src={individual.image}></img> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col><p className="playlisttitle">{individual.song}</p></Col>
                    </Row>
                    {/* <Row>
                        <Col><p className="songContents" style={{textAlign:'center'}}>Artist: {individual.track.album.artists[0].name}</p></Col>
                    </Row> */}
                    <Row>
                        <Col><p className="songContents" style={{textAlign:'center'}}>Album: {individual.album}</p></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button color="warning" onClick={() => this.props.setSong({preview_url: individual.preview_url, album: individual.album, song: individual.song, image: individual.image})}>Play</Button>
                        </Col>
                        {/* <Col>
                            <Album url={individual.track.album.href} titlePlaylist={individual.track.album.name} id={individual.id} stats="album"/>
                        </Col> */}
                    </Row>
                </div>
                )


        return(
            <div className="toplookout">
                <div style={{backgroundColor: '#b6e7fd'}}>
                    <Row>
                <Col>
                <h4 className="playListHead">My PlayLists</h4></Col>
                <Col style={{textAlign: "right"}}><Button color="success" style={{marginTop: "15px", marginRight: "20px"}} onClick={() => this.createnew()}>Create a new Playlist</Button></Col>
                </Row>
    
                {
                    this.props.token ? 
                    this.state.playlistsloading ?
                    <Spinner size="sm" color="primary" />:
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
                    this.state.recentlyloading ?
                    <Spinner size="sm" color="primary" />:
                    <div>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={4}
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

                { this.props.songspreviewed.length != 0 ? <h4 className="playListHead">Recently Previewed</h4>: null}
                {
                    this.props.token ? 
                    <div>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={5}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem2}
                        activeItemIndex={this.state.activeItemIndex2}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {recentlypreviewed}
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
        songspreviewed: state.song.songsPreviewed,
        myplaylist: state.song.myplaylist,
        userid: state.user.userInfo.id
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url)),
        createnewplay: (name, id) => dispatch(createnewplaylist(name, id))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(MyTunes)