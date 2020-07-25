const express = require('express');
const router = express.Router();
let request = require('request');
let querystring = require('querystring');

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

  router.get('/login', function(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: 'f0bbdb786c6e4f42bdcd954092d0c1cf',
        scope: 'streaming user-read-private user-read-email user-read-playback-state user-read-recently-played',
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
          'f0bbdb786c6e4f42bdcd954092d0c1cf' + ':' + 'b25757a750f848baaba1a34d033c06c3'
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
      res.redirect(uri + '?access_token=' + access_token)
    })

  })

  module.exports = router