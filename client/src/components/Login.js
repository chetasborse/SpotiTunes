import React from 'react'
import './Login.css'
import {Button} from 'reactstrap'

function Login() {
    return(

           
            <div className="cont" style={{backgroundColor: '#222'}}>
             <div class="container">
            <h4 className="heads">Welcome to SpotiTunes</h4>
            </div>
            <div class="container">
                <Button className="heads2" color="success" onClick={() => window.location='http://localhost:8888/login'}>Log In with Spotify</Button>
            </div>
            <div class="view">
            <div class="plane main">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            </div>
            <div class="container">
            <h4 className="heads3">A web client based on APIs from Spotify</h4>
            <h6 className="heads4">Note: In this version only previews of songs are available</h6>
            </div>
            </div>
            
    )
}

export default Login