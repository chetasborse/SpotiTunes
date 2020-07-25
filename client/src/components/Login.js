import React from 'react'
import './Login.css'
import {Button, Container} from 'reactstrap'

function Login() {
    return(

           
            <Container className="cont" style={{backgroundColor: '#222'}}>
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
            </div>
            </Container>
            
    )
}

export default Login