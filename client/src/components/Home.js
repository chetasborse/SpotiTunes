import React, {Component} from 'react';

import Login from './Login';
import {connect} from 'react-redux'

import { getAccessToken, getInfo } from '../reduxfiles/user/userActions';
import queryString from 'query-string'
import AppNavBar from './AppNavBar';
import Player from './Player';
import CurrentSongInfo from './CurrentSongInfo';
import { getPlaylist } from '../reduxfiles/song/songActions';



class Home extends Component{

  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoggedIn: false,
    }

  }

  componentDidMount(props) {
    let parsed = queryString.parse(window.location.search)
    let access_token = parsed.access_token

      if(access_token) {
        localStorage.setItem('token', access_token)
        this.props.getplaylist()
        this.props.getInfo()
        this.setState({
            token: access_token,
            isLoggedIn: true
        })
     }
      else{
        access_token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
        this.props.getplaylist()
        this.props.getInfo()
        this.setState({
          token: access_token,
          isLoggedIn: access_token ? true : false
      })
      }
  }

  sendData = (data) => {
      this.props.settoken(data)
  }
  
  render() {
    return (
      <div>
        {
            this.sendData(this.state.token)
        }
        { 
          !this.state.isLoggedIn ?
          <Login /> : null
        }
        {
          this.state.isLoggedIn ?
            <React.Fragment>
              <AppNavBar />
              <div className="player">
                <CurrentSongInfo />
                <Player url={this.props.songurl}/>
              </div>
              
            </React.Fragment>
          : null
        }
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    token: state.user.userAccessToken,
    songurl: state.song.songurl
  }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        settoken: (token) => dispatch(getAccessToken(token)),
        getplaylist: () => dispatch(getPlaylist()),
        getInfo: () => dispatch(getInfo())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);

