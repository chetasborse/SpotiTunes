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
import { setSong } from '../reduxfiles/song/songActions'

class IndiPlaylist extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            songs: [],
            isLoading: true,
            url: '',
            url2: '',
            isalbum: false,
            isplaylist: false
        }   
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null
        })
    }

    componentDidUpdate(prevState, prevProps) {
        if(prevProps.url !== this.props.url) {
            if(this.props.stats === 'playlist') {
                const url = this.props.url
                axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`
                    }
                })
                .then(response => {
                    this.setState({
                        songs: response.data.items,
                        isLoading: false,
                        msg: '',
                        isplaylist:true,
                        isalbum:false
                    })
                })
                .catch(err => {
                    this.setState({
                        msg: '',
                        isLoading: false
                    })
                })
            }
            else {
                const url = this.props.url
                axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${this.props.token}`
                    }
                })
                .then(response => {
                    this.setState({
                        songs: response.data.tracks.items,
                        isLoading: false,
                        msg: '',
                        isalbum: true,
                        isplaylist: false
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
    }

    giveurl = (url) => {
        if(!url) {
            this.setState({
                url2: ''
            })
        }
        else {
            this.setState({
                url2: url
            })
        }
    }

    render() {

        return (
            <div>
                <Button onClick={this.toggle} color="danger">View Album</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                    <ModalHeader className="titleModal"> {this.props.titlePlaylist}</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {   this.state.msg ? 
                                <h3>{this.state.msg}</h3> :
                                this.state.isLoading ?
                                <Spinner size="sm" color="primary" />:
                                this.state.songs.map(indi => 
                                    <ListGroupItem key={indi.track.id} className="playlistcar" style={{background: '#444'}}>
                                        <Row>
                                            <Col xs="auto"><img className="imgSize" src={indi.track.album.images[1].url}></img></Col>
                                            <Col>
                                                <p className="songContents" onClick= {() => this.getalbum(indi.track.album.href, indi.track.album.id, this.props.id)}>Album: {indi.track.album.name}</p>
                                                {/* { this.state.albumid === individual.id && this.state.albumid1 === indi.track.album.id ? <Sample2 url={this.state.albumurl} token={this.state.userAccessToken}></Sample2> : null} */}
                                                <p className="songContents">Song: {indi.track.name}</p>
                                                <p className="songContents">Artist: {indi.track.album.artists[0].name}</p>
                                            </Col>                                       
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Button color="warning" onClick={() => this.props.setSong(indi.track.preview_url)}>Play</Button>
                                            </Col>
                                        </Row>
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
        url2: state.song.songurl
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(IndiPlaylist)