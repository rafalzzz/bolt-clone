const useAddFacialRecognition = () => {
  /* const handleSubmit = async (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
  ) => {
    // wait for one last drawing onto the canvas
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    setIsLoading(true);

    if (!videoRef.current) {
      setIsLoading(false);
      return toast.error('Something went wrong when adding the photo');
    }

    const video = videoRef.current;
    // stop streaming from user and pause video
    stopStreamedVideo(video);

    if (!canvasRef.current) {
      setIsLoading(false);
      return toast.error('Something went wrong when adding the photo');
    }

    const canvas = canvasRef.current;
    // redraw detection at the end of this function
    const detection = await detectFaces(video, {
      width: video.width,
      height: video.height,
    });

    // clear and repaint the canvas using video data
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsLoading(false);
        return toast.error('Something went wrong when adding the photo');
      }

      const filename = `${getRandomPin(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        6,
      )}.png`;
      const file = new File([blob], filename, { type: blob.type });

      onSubmit({ file, setIsLoading });
    });
    drawDetections(canvas, detection || []);
  }; */
};

export default useAddFacialRecognition;
