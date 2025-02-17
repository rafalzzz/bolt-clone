const createMockedStreamFromImage = (imagePath: string): Promise<MediaStream> => {
  return new Promise((resolve) => {
    const image = new Image();

    image.src = imagePath;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      ctx.drawImage(image, 0, 0, image.width, image.height);

      const stream = canvas.captureStream(0);

      resolve(stream);
    };
    image.onerror = () => {
      throw new Error('Failed to load image for mock stream');
    };
  });
};

export default createMockedStreamFromImage;
