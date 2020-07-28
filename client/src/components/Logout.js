import React, {Component} from 'react'
import {Button} from 'reactstrap'

class Logout extends Component {

    constructor() {
        super()
        this.state = {
            logout: false
        }
    }

    componentDidUpdate(prevState) {
        if(prevState.logout !== this.state.logout){
            localStorage.clear()
            window.location.reload()
        }
    }

    setlogout = () => {
        this.setState({
            logout: true
        })
    }

    render() {
        return(
            <div className="toplookout" style={{backgroundColor: '#b6e7fd'}}>
                <h1 className="playListHead" style={{textAlign: 'center'}}>Do you want to logout?</h1>
                <div style={{textAlign: 'center'}}>
                <Button color="danger" onClick={() => this.setlogout()}>Sure</Button>
                </div>
            </div>
        )
    }
}

export default Logout