import type { RefObject } from 'react';

const stopStreamedVideo = (video: RefObject<HTMLVideoElement>) => {
  if (!video.current) {
    return;
  }

  const { current: videoElement } = video;

  videoElement.pause();

  const tracks = (videoElement.srcObject as MediaStream).getTracks() || [];

  tracks.forEach((track) => {
    track.stop();
  });
};

export default stopStreamedVideo;
