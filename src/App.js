import React, { Component } from 'react';
import bicepsImage from './resources/biceps.png';
import smileyImage from './resources/smiley.png';
import pizzaVideo from './resources/pizza.mp4';

import './App.scss';
import { loadWebcamVideo } from './services/cameraService';

const VIDEO_URL = "pizzaVideo";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Promise.resolve(loadWebcamVideo()).then(cameraLoadedFlag => {
      if(!cameraLoadedFlag) {
        //camera failed to load
      }
  });
  }

  render() {
    return (
      <div className="app-wrapper">
        <div className="alex-trademark-wrapper">
          <img src={bicepsImage} className="biceps-image" />
          <img src={smileyImage} className="smiley-image" />
          <img src={bicepsImage} className="biceps-image reverted-biceps-image" />
        </div>
        {/* <video id="video" className="video-demo" autoplay></video> */}
        <video autoPlay loop muted className="playing-video">
          <source src={pizzaVideo} type="video/mp4"/>
          Why isn't the video playing?
        </video>
      </div>
    );
  }
}

export default App;
