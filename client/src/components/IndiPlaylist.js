import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './AppNavBar.css'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    ListGroup,
    ListGroupItem,
    Col,
    Row,
    Spinner
} from 'reactstrap'
import Player from './Player'
import { setSong, addSong, deleteplaylistitem } from '../reduxfiles/song/songActions'
import Album from './Album'


class IndiPlaylist extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            songs: [],
            isLoading: true,
            url: '',
            msg: null,
        }   
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null,
        })
    }

    signal = axios.CancelToken.source();

    componentDidUpdate(prevState, prevProps) {
            if(this.state.modal && prevProps.url !== this.props.url) {
            const url = this.props.url
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }, {
                cancelToken: this.signal.token,
              })
            .then(response => {
                this.setState({
                    songs: response.data.items,
                    isLoading: false,
                    msg: ''
                })
            })
            .catch(err => {
                this.setState({
                    msg: '',
                    isLoading: false
                })
            })
        }
    }

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
      }

    seturl(item) {
        if(item.preview_url)
            this.props.setSong(item)
        else
            alert('No preview available')
    }

    deleteitem = (uri) => {
        const url = `https://api.spotify.com/v1/playlists/${this.props.id}/tracks`
        this.props.deleteitem(url, uri)
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} color="danger">View Playlist</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                    <ModalHeader className="titleModal"> {this.props.titlePlaylist}</ModalHeader>
                    <ModalBody>
                        {this.state.songs.length !== 0 ? 
                        <ListGroup>
                            { 
                                this.state.isLoading ?
                                <Spinner size="sm" color="primary" />:
                                this.state.songs.map(indi => 
                                    <ListGroupItem key={indi.track.id} className="playlistcar" style={{background: '#444'}}>
                                        <div style={{textAlign: 'right', marginBottom: '5px'}}>
                                            <Button onClick={() => this.deleteitem(indi.track.uri)}>&times;</Button>
                                        </div>
                                        <Row>
                                            {indi.track.album.images ? <Col xs="auto"><img className="imgSize" src={indi.track.album.images[1].url}></img></Col> : null}
                                            <Col>
                                                <p className="songContents">Album: {indi.track.album.name}</p>
                                                <p className="songContents">Song: {indi.track.name}</p>
                                                <p className="songContents">Artist: {indi.track.album.artists[0].name}</p>
                                            </Col>                                       
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Button color="warning" onClick={() => this.seturl({preview_url: indi.track.preview_url, album: indi.track.album.name, song: indi.track.name, image: indi.track.album.images[1].url})}>Play</Button>
                                            </Col>
                                            <Col>
                                                <Album url={indi.track.album.href} id={indi.id} stats="album"/>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>)
                            }  
                        </ListGroup> : null 
                    }
                    </ModalBody>
                    {/* <Player url={this.state.url2} /> */}
                    <Button color="danger" onClick={this.toggle}>Back</Button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.userAccessToken,
        url2: state.song.songurl
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url)),
        deleteitem: (url, uri) => dispatch(deleteplaylistitem(url, uri))
        // addSong: (item) => dispatch(addSong(item))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(IndiPlaylist)