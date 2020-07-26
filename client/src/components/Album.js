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
import { setSong } from '../reduxfiles/song/songActions'

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

    componentDidUpdate(prevState, prevProps) {
        if(prevProps.url !== this.props.url) { 
            const url = this.props.url
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            })
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

    render() {

        return (
            <div>
                <Button onClick={this.toggle} color="danger">View Album</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                    <ModalHeader className="titleModal">Album: {this.state.albumname}</ModalHeader>
                    {this.state.albumimage ? <ModalHeader className="titleModal"><img style={{height: '200px'}} src={this.state.albumimage}></img></ModalHeader> : null}
                    <ModalBody>
                        <ListGroup>
                            {   this.state.msg ? 
                                <h3>{this.state.msg}</h3> :
                                this.state.isLoading ?
                                <Spinner size="sm" color="primary" />:
                                this.state.songs.map(indi => 
                                    <ListGroupItem key={indi.id} className="playlistcar" style={{background: '#444'}}>
                                        <Row>
                                            <Col>
                                                {/* { this.state.albumid === individual.id && this.state.albumid1 === indi.track.album.id ? <Sample2 url={this.state.albumurl} token={this.state.userAccessToken}></Sample2> : null} */}
                                                <p className="songContents">Song: {indi.name}</p>
                                            </Col>
                                            <Col>
                                                <p className="songContents">Artist: {indi.artists[0].name}</p>
                                            </Col>                                       
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Button color="warning" onClick={() => this.props.setSong(indi.preview_url)}>Play</Button>
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

export default connect(mapStateToProps, mapDispatchtoProps)(Album)