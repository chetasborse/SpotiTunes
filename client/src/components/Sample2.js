import React, {Component} from 'react'
import Player from './Player'

class Sample2 extends Component {
    constructor(props) {
        super()
        this.state = {
            data: [],
            musicurl: ''
        }
    }

    componentDidMount() {
        fetch(this.props.url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${this.props.token}`     
        }
        })
        .then(response => {
            response.json()
                .then(data => {
                    this.setState({
                        data: data.tracks.items,
                    })
                })
            
            
        })
        .catch(err => console.log('Error occ'))
    }

    playMusic(url) {
        if(!url)
        return
        else
        this.setState({
            musicurl: url
        })
    }

    render() {
        const items = this.state.data.map(individual => <li key={individual.id}>{individual.name}<button onClick={() => this.playMusic(individual.preview_url)}>Play</button></li>)
        return(
            <div>
            {
                items
            } 
            <Player url={this.state.musicurl} />
            </div>   
                  
        )
    }
}

export default Sample2