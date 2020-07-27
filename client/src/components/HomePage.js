import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import {connect} from 'react-redux'
import axios from 'axios'
import {Row, Col, Button} from 'reactstrap'
import Album from './Album';
import { setSong, artistModal } from '../reduxfiles/song/songActions';
import Artists from './Artists';
import IndiPlaylist from './IndiPlaylist';


class HomePage extends React.Component {

  constructor() {
      super()
      this.state = {
          activeItemIndex1: 0,
          activeItemIndex2: 0,
          activeItemIndex: 0,
          activeItemIndex3: 0,
          artistslist: [],
          trackslist: [],
          artistSelected: '',
          newreleases: [],
          featuredmessage: '',
          featuredplaylists: [],
      }
  }

  componentDidMount() {
    const config = {
      headers: {
          Authorization: `Bearer ${this.props.token}`
      }
    }

    if(this.props.token) {
      axios.get('https://api.spotify.com/v1/me/top/artists', config)
      .then(response => {
        this.setState({
          artistslist: response.data.items
        })
      })
      .catch(err => {
        console.log('Error in retrieving data')
      })

      axios.get('https://api.spotify.com/v1/me/top/tracks', config)
      .then(response => {
        this.setState({
          trackslist: response.data.items
        })
      })
      .catch(err => {
        console.log('Error in retrieving data')
      })

      axios.get('https://api.spotify.com/v1/browse/new-releases', config)
      .then(response => {
        this.setState({
          newreleases: response.data.albums.items
        })
      })
      .catch(err => {
        this.setState({
            errmsgrecently: 'Unable to retrieve the playlist'
        })
    })
      
      axios.get('https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=10', config)
      .then(response => {
          this.setState({
              featuredplaylists: response.data.playlists.items,
              featuredmessage: response.data.message
          })
      })
      .catch(err => {
          this.setState({
              errmsgrecently: 'Unable to retrieve the playlist'
          })
      })

    }
  }

  changeActiveItem1 = (activeItemIndex1) => this.setState({ activeItemIndex1 });
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
  changeActiveItem2 = (activeItemIndex2) => this.setState({ activeItemIndex2 });
  changeActiveItem3 = (activeItemIndex3) => this.setState({ activeItemIndex3 });

  seturl = (item) => {
    if(item.preview_url)
        this.props.setSong(item)
  }

  render() {

    const reco = this.state.trackslist.map(individual =>
      <div className="playlistcar" key={individual.id}>
          <Row>
              <Col>
                  <img style={{height: '200px', marginBottom: '20px'}} src={individual.album.images[1].url}></img>
              </Col>
          </Row>
          <Row>
              <Col><p className="playlisttitle">{individual.name}</p></Col>
          </Row>
          <Row>
              <Col><p className="songContents" style={{textAlign:'center'}}>Artist: {individual.album.artists[0].name}</p></Col>
          </Row>
          <Row>
              <Col><p className="songContents" style={{textAlign:'center'}}>Album: {individual.album.name}</p></Col>
          </Row>
          <Row>
              <Col>
                  <Button color="warning" onClick={() => this.seturl({preview_url: individual.preview_url, album: individual.album.name, song: individual.name, image: individual.album.images[1].url})}>Play</Button>
              </Col>
              <Col>
                  <Album url={individual.album.href} titlePlaylist={individual.album.name} id={individual.id} stats="album"/>
              </Col>
          </Row>
      </div>
      )

      const artists = this.state.artistslist.map(individual =>
        <div key={individual.id} className="artists">
          <Row>
            <Col><img src={individual.images[1].url} className="artistimage"></img></Col>
          </Row>
          <Row>
            <Col><Artists artist_id = {individual.id} artist_image = {individual.images[1].url} artist_name={individual.name}/></Col>
          </Row>
        </div>  
        )

        const new_releases = this.state.newreleases.map(individual => 
          <div key={individual.id} className="playlistcar">
            <Row>
              <Col>
                  <img style={{height: '200px', marginBottom: '20px'}} src={individual.images ? individual.images[1].url : ''}></img>
              </Col>
            </Row>
            <Row>
              <Col><p className="playlisttitle">Album: {individual.name}</p></Col>
            </Row>
            <Row>
              <Col><p className="playlisttitle">Artist: {individual.artists[0].name}</p></Col>
            </Row>
            <Row>
              <Col>
                  <Album url={individual.href} titlePlaylist={individual.name} id={individual.id} stats="album"/>
              </Col>
          </Row>
          </div>
          )

          const featuredplaylists = this.state.featuredplaylists.map(individual => 
            <div key={individual.id} className="playlistcar">
                <Row>
                    <Col><p className="playlisttitle">{individual.name}</p></Col>
                </Row>
                <Row>
                    <Col>{ individual.images[0] !== undefined ? <img src={individual.images[0].url} style={{height: '350px', marginBottom: '20px'}}></img> : null }</Col>
                </Row>
                <Row>
                <Col>
                <p>No. of Tracks: {individual.tracks.total}</p>
                <IndiPlaylist url={individual.tracks.href} titlePlaylist={individual.name} id={individual.id} stats="playlist"/>
                </Col>
                </Row>
            </div>
            )

      return (
          <div className="toplookout">
            <div style={{backgroundColor: '#b6e7fd'}}>
            <h4 className="playListHead">{this.state.featuredmessage}</h4>
            {
                    this.props.token ? 
                    <div>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={3}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem3}
                        activeItemIndex={this.state.activeItemIndex3}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {featuredplaylists}
                    </ItemsCarousel>
                    </div>
                    : null
                }
            <h4 className="playListHead">Recommended Artists</h4>
            {
                    this.props.token ? 
                    <div>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={5}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem}
                        activeItemIndex={this.state.activeItemIndex}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {artists}
                    </ItemsCarousel>
                    </div>
                    : null
                }
            <h4 className="playListHead">Recommended Tracks</h4>
            {
                    this.props.token ? 
                    <div>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={4}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem1}
                        activeItemIndex={this.state.activeItemIndex1}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {reco}
                    </ItemsCarousel>
                    </div>
                    : null
                }
                <h4 className="playListHead">New Releases</h4>
            {
                    this.props.token ? 
                    <div>
                    <ItemsCarousel
                        enablePlaceholder
                        numberOfPlaceholderItems={5}
                        numberOfCards={4}
                        gutter={12}
                        showSlither={true}
                        firstAndLastGutter={true}
                        freeScrolling={true}
                        requestToChangeActive={this.changeActiveItem2}
                        activeItemIndex={this.state.activeItemIndex2}
                        activePosition={'center'}
                        chevronWidth={24}
                        rightChevron={'>'}
                        leftChevron={'<'}
                        outsideChevron={false}
                    >
                        {new_releases}
                    </ItemsCarousel>
                    </div>
                    : null
                }
            </div>
          </div>
      );  
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

export default connect(mapStateToProps, mapDispatchtoProps)(HomePage)
