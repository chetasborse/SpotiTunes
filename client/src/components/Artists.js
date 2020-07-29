import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './AppNavBar.css'

import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    Spinner,
    Input
} from 'reactstrap'
import { setSong, addtoplaylist } from '../reduxfiles/song/songActions'
import Album from './Album'

class Artists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            userData: {},
            songs:[],
            artist_name: '',
            artistimage: '',
            isLoading: true
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
        if(prevProps.artist_id !== this.props.artist_id && this.state.modal) {
            const url = `https://api.spotify.com/v1/artists/${this.props.artist_id}/top-tracks?country=IN`
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            }, {
                cancelToken: this.signal.token,
              })
            .then(response => {
                this.setState({
                    songs: response.data.tracks,
                    artist_name: this.props.artist_name,
                    artistimage : this.props.artist_image ? this.props.artist_image: '',
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

    seturl2 = (item) => {
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
                <Button onClick={this.toggle} color="warning">{this.props.artist_name}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                    <ModalHeader className="titleModal">{this.props.artist_name}</ModalHeader>
                    {this.props.artist_image ? <ModalHeader className="titleModal"><Col sm="auto"><img style={{height: '200px'}} src={this.props.artist_image}></img></Col><Col sm="auto"></Col></ModalHeader> : null}
                
                    <ModalBody>
                    <ListGroup>
                            { 
                                this.state.isLoading ?
                                <Spinner size="sm" color="primary" />:
                                this.state.songs.map(indi => 
                                    <ListGroupItem key={indi.id} className="playlistcar" style={{background: '#444'}}>
                                        <div style={{marginBottom: '10px'}}>
                                        <Row>
                                            <Col xs="9">
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
                                            <Col xs="auto"><img className="imgSize" src={indi.album.images[1] ? indi.album.images[1].url : ''}></img></Col>
                                            <Col>
                                                <p className="songContents">Album: {indi.album.name}</p>
                                                <p className="songContents">Song: {indi.name}</p>
                                            </Col>                                       
                                        </Row>
                                        <div style={{marginTop: '10px'}}>
                                        <Row>
                                            <Col>
                                            <Button color="warning" onClick={() => this.seturl2({preview_url: indi.preview_url, album: indi.album.name, song: indi.name, image: indi.album.images[1].url})}>Play</Button>
                                            </Col>
                                            <Col>
                                                <Album url={indi.album.href} id={indi.id} stats="album"/>
                                            </Col>
                                        </Row>
                                        </div>

                                    </ListGroupItem>)
                            }  
                        </ListGroup>
                    </ModalBody> 
                    <Button color="danger" onClick={this.toggle}>Back</Button>
                    
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.userAccessToken,
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

export default connect(mapStateToProps, mapDispatchtoProps)(Artists)