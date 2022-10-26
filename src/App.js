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
    // Promise.resolve(loadWebcamVideo()).then(cameraLoadedFlag => {
    //   if(!cameraLoadedFlag) {
    //     //camera failed to load
    //   }
    // });
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
        {/* <div dangerouslySetInnerHTML={{
            __html: `
              <video
                loop
                muted
                autoplay
                playsinline
              >
                <source src="./resources/pizza.mp4" type="video/mp4"/>
              </video
            `
          }}
        /> */}
        {/* <video src="https://app.kemtai.com/media/exercises/11526b5e-b661-41f7-a0ca-509ef80d3f7f/480p.webm#t=0" class="playing-video" autoplay preload="auto" playsinline loop style="opacity: 1;"></video> */}
        <video autoPlay loop muted className="playing-video" preload="auto" playsinline src={pizzaVideo}/>
      </div>
    );
  }
}

export default App;
