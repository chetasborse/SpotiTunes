import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS
 
const Player = (props) => (
  <AudioPlayer
    autoPlay
    // src="https://p.scdn.co/mp3-preview/471a93c87b376eb633105c941567cce917183fd1?cid=f0bbdb786c6e4f42bdcd954092d0c1cf"
    src = {props.url}
    onPlay={e => console.log("onPlay")}
    // other props here
  />
);

export default Player