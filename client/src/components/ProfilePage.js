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
    Row
} from 'reactstrap'

class ProfilePage extends Component {
    constructor() {
        super()
        this.state = {
            modal: false,
            userData: {}
        }   
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            msg: null
        })
    }

    componentDidMount() {
        // axios.get('https://api.spotify.com/v1/me', {
        //     headers: {
        //         Authorization: `Bearer ${this.props.token}`
        //     }
        // })
        // .then(response => {
        //     this.setState({
        //         userData: response.data
        //     })
        // })
        // .catch(err => {
        //     this.setState({
        //         msg: 'Error in retrieving information'
        //     })
        // })
    }

    render() {
        const {userData} = this.props
        const num = 0

        return (
            <div>
                <NavLink onClick={this.toggle} href="#" className="linkclass1">Profile</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>My Profile</ModalHeader>
                    <ModalBody>
                        {userData.image !== undefined  ?
                        <img className="profileimage" src={userData.image}></img> :
                        null
                        }
                        <h6>Name: <span>{userData.name}</span></h6>
                        <h6>Email: <span>{userData.email}</span></h6>
                        
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
        userData: state.user.userInfo
    }
}

export default connect(mapStateToProps)(ProfilePage)