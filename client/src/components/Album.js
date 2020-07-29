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
    Spinner,
    Input
} from 'reactstrap'
import { setSong, addtoplaylist } from '../reduxfiles/song/songActions'

class Album extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            songs: [],
            isLoading: true,
            url: '',
            albumname: '',
            albumimage: ''
        }   
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null
        })
    }

    signal = axios.CancelToken.source();

    componentDidUpdate(prevState, prevProps) {
         if(prevProps.url !== this.props.url && this.state.modal) {
            const url = this.props.url
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }, {
                cancelToken: this.signal.token,
              }
            )
            .then(response => {
                this.setState({
                    songs: response.data.tracks.items,
                    albumname:response.data.name,
                    albumimage:response.data.images ? response.data.images[1].url: '',
                    isLoading: false,
                    msg: '',
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

    seturl = (item) => {
        if(item.preview_url)
            this.props.setSong(item)
        else
            alert('No preview available')
    }

    addtoplay = (songid) => {
        if(this.state.addplayid !== '' && this.state.addplayid !== 'Add to Playlist') {
            const playlist_id = this.props.playlist[this.state.addplayid]
            const urls = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${songid}`
            console.log(urls)
            this.props.addtoplaylist(urls)
        }
    }

    render() {
        const myplaylists= this.props.myplaylist1.map(individual => ({name: individual.name, id: individual.id}))

        return (
            <div>
                <Button onClick={this.toggle} color="danger">View Album</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                    <ModalHeader className="titleModal">Album: {this.state.albumname}</ModalHeader>
                    {this.state.albumimage ? <ModalHeader className="titleModal"><img style={{height: '200px'}} src={this.state.albumimage}></img></ModalHeader> : null}
                    <ModalBody>
                        <ListGroup>
                            { 
                                this.state.isLoading ?
                                <Spinner size="sm" color="primary" />:
                                this.state.songs.map(indi => 
                                    <ListGroupItem key={indi.id} className="playlistcar" style={{background: '#444'}}>
                                        <div style={{marginBottom: '10px'}}>
                                        <Row>
                                            <Col xs="7">
                                            <Input className="inputplaylist" type="select" onChange={(e) => this.setState({addplayid:  e.target.value})}>
                                            <option>Add to Playlist</option>
                                            {
                                                myplaylists.map(ind => <option id={ind.id}>{ind.name}</option>)
                                            }
                                            </Input></Col>
                                            <Col xs="2"><Button onClick={() => this.addtoplay(indi.uri)}>Add</Button></Col>
                                        </Row>
                                        </div>
                                        <Row>
                                            <Col>
                                                {/* { this.state.albumid === individual.id && this.state.albumid1 === indi.track.album.id ? <Sample2 url={this.state.albumurl} token={this.state.userAccessToken}></Sample2> : null} */}
                                                <p className="songContents">Song: {indi.name}</p>
                                            </Col>
                                            <Col>
                                                <p className="songContents">Artist: {indi.artists[0].name}</p>
                                            </Col>                                       
                                        </Row>
                                        <div style={{marginTop: '10px'}}>
                                        <Row>
                                            <Col>
                                            <Button color="warning" onClick={() => this.seturl({preview_url: indi.preview_url, album: this.state.albumname, song: indi.name, image: this.state.albumimage})}>Play</Button>
                                            </Col>
                                        </Row>
                                        </div>
                                    </ListGroupItem>)
                            }  
                        </ListGroup> 
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
        url2: state.song.songurl,
        myplaylist1: state.song.myplaylist,
        playlist: state.song.playlist,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url)),
        addtoplaylist: (url) => dispatch(addtoplaylist(url))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Album)