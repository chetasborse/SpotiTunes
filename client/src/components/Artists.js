import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './AppNavBar.css'

import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    NavLink,
    Button,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    Spinner
} from 'reactstrap'
import { setSong } from '../reduxfiles/song/songActions'
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

    componentDidUpdate(prevState, prevProps) {
        if(prevProps.artist_id !== this.props.artist_id) { 
            const url = `https://api.spotify.com/v1/artists/${this.props.artist_id}/top-tracks?country=IN`
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
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

    seturl = (item) => {
        if(item.preview_url)
            this.props.setSong(item)
    }

    render() {

        return (
            <div>
                <Button onClick={this.toggle} color="warning">{this.props.artist_name}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} scrollable="true">
                    <ModalHeader className="titleModal">{this.props.artist_name}</ModalHeader>
                    {this.props.artist_image ? <ModalHeader className="titleModal"><img style={{height: '200px'}} src={this.props.artist_image}></img></ModalHeader> : null}
                    <ModalBody>
                    <ListGroup>
                            {   this.state.msg ? 
                                <h3>{this.state.msg}</h3> :
                                this.state.isLoading ?
                                <Spinner size="sm" color="primary" />:
                                this.state.songs.map(indi => 
                                    <ListGroupItem key={indi.id} className="playlistcar" style={{background: '#444'}}>

                                        <Row>
                                            <Col xs="auto"><img className="imgSize" src={indi.album.images[1].url}></img></Col>
                                            <Col>
                                                <p className="songContents">Album: {indi.album.name}</p>
                                                <p className="songContents">Song: {indi.name}</p>
                                            </Col>                                       
                                        </Row>
                                        <div style={{marginTop: '10px'}}>
                                        <Row>
                                            <Col>
                                            <Button color="warning" onClick={() => this.seturl({preview_url: indi.preview_url, album: indi.album.name, song: indi.name, image: indi.album.images[1].url})}>Play</Button>
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
        token: state.user.userAccessToken
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Artists)