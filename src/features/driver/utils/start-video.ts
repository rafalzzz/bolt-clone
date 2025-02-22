import getErrorMessage from '@/shared/utils/client-side/get-error-message';

type TStartVideo = {
  video: HTMLVideoElement | null;
  onError: (error: string) => void;
};

const startVideo = ({ video, onError }: TStartVideo) => {
  if (!video) {
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: {}, audio: false })
    .then(
      (stream: MediaStream) =>
        ((video as HTMLVideoElement).srcObject = new MediaStream(stream.getVideoTracks())),
    )
    .catch((error) => {
      const errorMessage = getErrorMessage(error);

      if (errorMessage) {
        onError(errorMessage);
      }
    });
};

export default startVideo;
