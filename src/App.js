import React, {useEffect, useRef, useState} from 'react';
import bicepsImage from './resources/biceps.png';
import smileyImage from './resources/smiley.png';
import pizzaVideo from './resources/pizza.webm';
import pizzaVideo2 from './resources/pizza3.mp4';
import * as mdPose from "@mediapipe/pose"
import {Pose} from "@mediapipe/pose"
import * as cam from "@mediapipe/camera_utils";
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils';
import Webcam from "react-webcam";
import ReactPlayer from 'react-player'
import './App.scss';
import useSound from 'use-sound';
import repSound from './resources/boop.wav';

const VIDEO_URL = "pizzaVideo";

function App() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [videoFilePath, setVideoFilePath] = useState(null);
    const synth = window.speechSynthesis;
    var camera = null;
    const [playRepCount] = useSound(
        repSound,
        {
            volume: 45,
            playbackRate: 0.5,
            soundEnabled: true
        }
    );

    useEffect(() => {
        const interval = setInterval(() => {
            playRepCount();
        }, 4000);
    });

    const handleVideoUpload = (event) => {
        setVideoFilePath('https://d1eo2cyh7srqsg.cloudfront.net/demo/demo_mvp_workout.mp4');
    };

    const handleSpeakButton = (e) => {
        const voices = synth.getVoices()
        const voice = voices.find(a => a.name == 'Samantha') // en women voice
        const voiceAdvice = new SpeechSynthesisUtterance("Hello there! Let's do our best!");
        voiceAdvice.voice = voice;
        synth.speak(voiceAdvice);
    };

    function onResults(results) {
        // const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        if (videoWidth && videoHeight) {
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext('2d');

            if (canvasCtx) {
                canvasCtx.save();
                canvasCtx.clearRect(
                    0,
                    0,
                    canvasElement.width,
                    canvasElement.height,
                );

                canvasCtx.drawImage(
                    results.image,
                    0,
                    0,
                    canvasElement.width,
                    canvasElement.height,
                );

                if (results.poseLandmarks) {
                    const landmarks = results.poseLandmarks;
                    const lineColor = 'white';

                    drawConnectors(
                        canvasCtx,
                        results.poseLandmarks,
                        mdPose.POSE_CONNECTIONS,
                        {visibilityMin: 0.65, color: lineColor},
                    );

                    drawLandmarks(
                        canvasCtx,
                        Object.values(mdPose.POSE_LANDMARKS_LEFT).map(
                            index => results.poseLandmarks[index],
                        ),
                        {
                            visibilityMin: 0.65,
                            color: lineColor,
                            fillColor: '#33eecc',
                        },
                    );

                    drawLandmarks(
                        canvasCtx,
                        Object.values(mdPose.POSE_LANDMARKS_RIGHT).map(
                            index => results.poseLandmarks[index],
                        ),
                        {
                            visibilityMin: 0.65,
                            color: lineColor,
                            fillColor: '#062622',
                        },
                    );

                    drawLandmarks(
                        canvasCtx,
                        Object.values(mdPose.POSE_LANDMARKS_NEUTRAL).map(
                            index => results.poseLandmarks[index],
                        ),
                        {visibilityMin: 0.65, color: lineColor, fillColor: 'white'},
                    );
                }
                canvasCtx.restore();
            }
        }
    }

    // }

    // setInterval(())
    useEffect(() => {

        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
        });


        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        pose.onResults(onResults);

        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null
        ) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await pose.send({image: webcamRef.current.video});
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    }, []);

    useEffect(() => {
        handleVideoUpload();
        console.log('videoFilePath', videoFilePath);
    })

    return (
        <div className="app-wrapper">
            <div className="alex-trademark-wrapper">
                <img src={bicepsImage} className="biceps-image"/>
                <img src={smileyImage} className="smiley-image"/>
                <img src={bicepsImage} className="biceps-image reverted-biceps-image"/>
            </div>
            <button onClick={handleSpeakButton}>Speak to me!</button>
            <div className={'grid grid gap-4 grid-cols-1 md:grid-cols-2 w-[90%] md:w-auto bg-black flex-[1_1_auto]'}>
                <div className={'relative rounded-2xl overflow-hidden'}>
                <Webcam
                    ref={webcamRef}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 150,
                        textAlign: 'center',
                        objectFit: 'cover',
                        zIndex: 5,
                        width: '300',
                        height: '150',
                    }}
                />
                <canvas
                    ref={canvasRef}
                    className="output_canvas"
                    style={{
                        position: 'absolute',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 150,
                        textAlign: 'center',
                        objectFit: 'cover',
                        zIndex: 5,
                        width: '300',
                        height: '300',
                    }}
                ></canvas>
                </div>
                <div className='player-wrapper'>
                    <ReactPlayer
                        playing
                        className="react-player rounded-2xl"
                        url='https://d1eo2cyh7srqsg.cloudfront.net/challenge/videos/HIPS+%26+GLUTES.mov'
                        controls
                        playsinline
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
