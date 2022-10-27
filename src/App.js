import React, { Component } from 'react';
import bicepsImage from './resources/biceps.png';
import smileyImage from './resources/smiley.png';
import pizzaVideo from './resources/pizza.webm';
import pizzaVideo2 from './resources/pizza3.mp4';
import Webcam from "react-webcam";

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
        <Webcam width={300} height={300}/>
        {/* <video id="video" className="video-demo" autoplay></video> */}
        <div dangerouslySetInnerHTML={{
            __html: `
              <video
                autoPlay
                loop
                muted
                className="playing-video"
                preload="auto"
                playsinline
                width="300"
                height="300"
                src=${pizzaVideo2}
              />
            `
          }}
        />
        {/* <video src="https://app.kemtai.com/media/exercises/11526b5e-b661-41f7-a0ca-509ef80d3f7f/480p.webm#t=0" class="playing-video" autoplay preload="auto" playsinline loop style="opacity: 1;"></video> */}
        {/* <video controls autoPlay loop muted preload="auto" playsinline className="playing-video" src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"/> */}
        {/* <video className="playing-video" src={pizzaVideo}/> */}
        {/* <p className="hello-text">
          Really 16?
        </p> */}
      </div>
    );
  }
}

export default App;
