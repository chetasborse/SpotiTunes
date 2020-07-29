const express = require('express');
const router = express.Router();
let request = require('request');
let querystring = require('querystring');

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

//Enter your client-id and client-secret-id here
  let client_id = 'CLIENT_ID'
  let client_secret = 'CLIENT_SECRET'

  router.get('/login', function(req, res) {
    
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: 'streaming user-read-private user-read-email user-top-read user-read-playback-state user-read-recently-played playlist-modify-public playlist-modify-private playlist-read-private',
        redirect_uri,
        show_dialog: true
      }))
  })
  
  router.get('/callback', function(req, res) {
    let code = req.query.code || null
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(
          client_id + ':' + client_secret
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
      res.redirect(uri + '?access_token=' + access_token + '&refresh_token=' + body.refresh_token)
    })

  })

  module.exports = router