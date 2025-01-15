const startVideo = (video: HTMLVideoElement | null) => {
  if (!video) {
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: {}, audio: false })
    .then(
      (stream: MediaStream) =>
        ((video as HTMLVideoElement).srcObject = new MediaStream(stream.getVideoTracks())),
    )
    .catch((err) => console.error(err));
};

export default startVideo;
