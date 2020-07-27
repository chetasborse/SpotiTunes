import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'reactstrap'


class CurrentSongInfo extends Component {
    constructor(){
        super()
        this.state = {
            msg: ''
        }
    }

    render() {
        const {currentSong} = this.props
        return(
            <React.Fragment>
            {   currentSong.song ?
                <Row>
                    <Col xs="auto">
                    <img style={{height: '60px'}} src={currentSong.image} />
                    </Col>
                    <Col>
                        <Row>
                            {currentSong.song}
                        </Row>
                        <Row>
                            {currentSong.album}
                        </Row>
                    </Col>
                </Row> : null
            }
            </React.Fragment>
        )

    }
}

const mapStateToProps = state => {
    return {
        currentSong: state.song.currSong
    }
}

export default connect(mapStateToProps)(CurrentSongInfo)

