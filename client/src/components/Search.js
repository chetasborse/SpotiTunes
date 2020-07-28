import React, {Component} from 'react'
import {Form, FormGroup, Button, Col, Input, Row, Label, CustomInput} from 'reactstrap'
import axios from 'axios'
import {connect} from 'react-redux'
import Artists from './Artists'
import { setSong, addtoplaylist } from '../reduxfiles/song/songActions'
import Album from './Album'
import ItemsCarousel from 'react-items-carousel';

class Search extends Component {
    constructor(){
        super() 
        this.state = {
            msg: '',
            activeItemIndex: 0,
            activeItemIndex1: 0,
            activeItemIndex2: 0,
            onarrive: true,
            entry: '',
            url: '',
            artists:[],
            albums:[],
            tracks:[],
            searchbut: false,
            artistbool: true,
            albumbool: true,
            trackbool: true,
            addplayid: ''
        }
    }

    searchspoti = (e) => {
        e.preventDefault()
        let new_query = this.state.entry.replace(/ /g, "%20")
        this.setState({
            entry: '',
            url: `https://api.spotify.com/v1/search?q=${new_query}&type=artist,album,track`,
            searchbut : true,
            onarrive: false
        })
    }

    componentDidUpdate(prevState) {
        if(this.state.searchbut && prevState.url !== this.state.url) {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
              }
            axios.get(this.state.url, config)
            .then(response => {
                this.setState({
                    artists: response.data.artists ? response.data.artists.items: [],
                    albums: response.data.albums? response.data.albums.items : [], 
                    tracks: response.data.tracks ? response.data.tracks.items : [],
                    searchbut: false
                })
                console.log(response.data.artists)
            })
            .catch(err => {
                this.setState({
                    errmsg: 'Unable to retrieve',
                    searchbut: false
                })
            })
        }
    }

    seturl = (item) => {
        if(item.preview_url)
            this.props.setSong(item)
        else
            alert('No preview available')
      }

      changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
      changeActiveItem1 = (activeItemIndex1) => this.setState({ activeItemIndex1 });
      changeActiveItem2 = (activeItemIndex2) => this.setState({ activeItemIndex2 });

      applyfilter = (buttonname, e) => {
        if(buttonname === "artists")
          this.setState({
              artistbool: e.target.checked
          })
        else if(buttonname === "tracks") 
          this.setState({
              trackbool: e.target.checked
          })
        else
          this.setState({
              albumbool: e.target.checked
          })  
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

        const artists = this.state.artists.map(individual =>
            <div key={individual.id} className="artists">
              <Row>
                {individual.images[1] ? <Col><img src={individual.images[1].url} className="artistimage"></img></Col> : null}
              </Row>
              <Row>
                <Col><Artists artist_id = {individual.id} artist_image = {individual.images[1] ? individual.images[1].url : ''} artist_name={individual.name}/></Col>
              </Row>
            </div>  
            )
        
            const reco = this.state.tracks.map(individual =>
                <div className="playlistcar" key={individual.id}>
                    {/* <div style={{marginBottom: '10px'}}>
                    <Row>
                        <Col xs="9">
                        <Input type="select" onChange={(e) => this.setState({addplayid:  e.target.value})}>
                        <option>Add to Playlist</option>
                        {
                            myplaylists.map(ind => <option id={ind.id}>{ind.name}</option>)
                        }
                        </Input></Col>
                        <Col xs="2"><Button onClick={() => this.addtoplay(individual.uri)}>Add</Button></Col>
                    </Row>
                    </div> */}
                    <Row>
                        <Col>
                            {individual.album.images[1] ? <img style={{height: '200px', marginBottom: '20px'}} src={individual.album.images[1].url}></img> : null}
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

            const albums = this.state.albums.map(individual => 
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

        return(
            <div className="toplookout" style={{backgroundColor: '#b6e7fd'}}>
                <Form onSubmit={this.searchspoti}>
                    <FormGroup row>
                        <Col sm={2}></Col>
                        <Col sm={5}>
                        <Input type="text" name="text" id="searchquery" placeholder="Search" onChange={(e) => this.setState({entry: e.target.value})}/>
                        </Col>
                        <Button sm={2} style={{height: '40px'}}>Search</Button>
                        <Col sm="auto">
                            <h6>Filters:</h6></Col>
                        <Col xs="auto">
                        <CustomInput type="switch" id="Artists" name="customSwitch" label="Artists" onChange={(e) => this.applyfilter("artists", e)} checked={this.state.artistbool}/></Col>
                        <Col xs="auto"><CustomInput type="switch" id="Tracks" name="customSwitch" label="Tracks" onChange={(e) => this.applyfilter("tracks", e)} checked={this.state.trackbool}/></Col>
                        <Col xs="auto"><CustomInput type="switch" id="Albums" name="customSwitch" label="Albums" onChange={(e) => this.applyfilter("albums", e)} checked={this.state.albumbool}/>
                        </Col>
                    </FormGroup>
                </Form>
                <Row>
                    <Col sm={4}></Col>
                    <Col>
                        {this.state.artists.length === 0 && this.state.albums.length === 0 && this.state.tracks.length === 0 && this.state.onarrive ? <h3 className="playListHead">Enter your request</h3> : null}
                        {this.state.artists.length === 0 && this.state.albums.length === 0 && this.state.tracks.length === 0 && !this.state.onarrive ? <h3 className="playListHead">No matches found</h3> : null}
                    </Col>
                </Row>
                {this.state.artistbool && this.state.artists.length !== 0 ?
                    <React.Fragment>
                     <h4 className="playListHead">Artists</h4>
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
                    </React.Fragment>
                    :
                    null
                }


                {this.state.trackbool && this.state.tracks.length !== 0 ?
                    <React.Fragment>
                        <h4 className="playListHead">Tracks</h4>
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
                    </React.Fragment> :
                    null
                }
                {this.state.albumbool && this.state.albums.length !== 0 ?
                    <React.Fragment>
                         <h4 className="playListHead">Albums</h4>
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
                        {albums}
                    </ItemsCarousel>
                    </div>
                    : null
                }
                    </React.Fragment> :
                    null
                }
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        token: state.user.userAccessToken,
        myplaylist1: state.song.myplaylist,
        playlist: state.song.playlist
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setSong : (url) => dispatch(setSong(url)),
        addtoplaylist: (url) => dispatch(addtoplaylist(url))
    }
  }

export default connect(mapStatetoProps, mapDispatchtoProps)(Search)