import React, {Component} from 'react'

class Search extends Component {
    constructor(){
        super() 
        this.state = {
            msg: ''
        }
    }

    render() {
        return(
            <div className="toplookout" style={{backgroundColor: '#b6e7fd'}}>Search</div>
        )
    }
}

export default Search