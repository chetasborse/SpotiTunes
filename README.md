# SpotiTunes

A web application which uses APIs from Spotify to display user profile, provide user with music recommendations based on their preferences. You can stream previews, create playlists, add songs, etc.


## Demo

![Farmers Market Finder Demo](gif/Spotitune.gif)


## To Run: 

1. Clone the project
2. In the client directory run ```npm install```
3. Generate client code to access the Spotify APIs here [https://developer.spotify.com/dashboard/applications](https://developer.spotify.com/dashboard/applications)
4. Create an app, copy the client-id and client secret id and paste it in routes/login.js:
5. Paste 'http://localhost:8888/callback' under 'Redirect URIs' in your created app's Edit Settings.
6. To run the application run ```npm run dev``` in parent directory

## Technologies used:

React in Node.js environment using Express.js framework

## Documentation:

For documentation on Spotify APIs visit [Spotify Documentation](https://developer.spotify.com/documentation/web-api/)
