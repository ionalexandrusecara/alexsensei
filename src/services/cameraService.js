// import { local_storage_config } from '../localStorageEnums/localStorageNames';

let videoConstraints = {
    video: {
        width: 3840,
        height: 1600
    }
};

//Camera devices
let cameras = [];
let camerasLabels = [];

let cameraDeviceSelected;
let cameraDeviceSelectedLabel;

export const loadWebcamVideo = async () => {
    return new Promise(async(resolve, reject) => {
        // Grab elements, create settings, etc.
        var video = document.getElementById('video');

        if(!video) {
            resolve(false);
        }

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            // const devices = await navigator.mediaDevices.enumerateDevices();
            // const videoDevices = devices.filter(device => device.kind === 'videoinput');

            // List cameras and microphones.
            cameras = [];
            camerasLabels = [];
            await navigator.mediaDevices.enumerateDevices().then(function(devices) {
                devices.forEach(function(device) {
                    if(device.kind == "videoinput") {
                        camerasLabels = camerasLabels.concat(device.label);
                        cameras = cameras.concat(device.deviceId);
                    }
                });
                // resolve(true);
            }).catch(function(err) {
                console.error(err.name + ": " + err.message);
                resolve(false);
            });

            // if(cameras.indexOf(localStorage.getItem(local_storage_config.SELECTED_CAMERA_DEVICE)) < 0) {
            //     if(cameras.length > 0 && camerasLabels.length > 0) {
            //         localStorage.setItem(local_storage_config.SELECTED_CAMERA_DEVICE, cameras[0]);

            //         videoConstraints = {
            //             video: {
            //                 deviceId: cameras[0],
            //                 width: 3840,
            //                 height: 1600
            //             }
            //         };

            //         cameraDeviceSelected= cameras[0];
            //         cameraDeviceSelectedLabel= camerasLabels[0];
            //     } else {
            //         resolve(false);
            //     }
            // } else {
            //     videoConstraints = {
            //         video: {
            //             deviceId: localStorage.getItem(local_storage_config.SELECTED_CAMERA_DEVICE),
            //             width: 3840,
            //             height: 1600
            //         }
            //     };
            // }
            console.log("BEFORE THE START", Date.now());

            await navigator.mediaDevices.getUserMedia(videoConstraints).then(stream => {
                console.log("STARTING TO STREAM", Date.now());
                window.localstream = stream;
                video.srcObject = stream;
                video.play();
                console.log("STREAM STARTED", Date.now())
                resolve(true);
            }).catch(error => {
                console.log("Webcam error: ", error);
                resolve(false);
            });
            
            // navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //     console.log("streams", stream);
            //     //video.src = window.URL.createObjectURL(stream);
            //     video.srcObject = stream;
            //     video.play();
            // });
        } else {
            resolve(false);
        }
    });
}

export function stopWebcamStream() {
    if(window.localstream) {
        window.localstream.getTracks().forEach(track => track.stop());
    }
}