import * as faceapi from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';

const loadFaceModels = async () => {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  ]);
};

export default loadFaceModels;
