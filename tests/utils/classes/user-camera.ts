import { type Page } from '@playwright/test';

export class UserCamera {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async mockDisabledUserCamera() {
    await this.page.evaluate(() => {
      navigator.mediaDevices.getUserMedia = async (constraints: MediaStreamConstraints) => {
        if (constraints.video || constraints.audio) {
          return Promise.reject(new DOMException('Permission denied', 'NotAllowedError'));
        }

        throw new Error('Media type not supported');
      };
    });
  }

  async mockUserCamera(imgUrl: string) {
    await this.page.evaluate((imagePath) => {
      const createMockedStreamFromImage = (imagePath: string): Promise<MediaStream> => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.crossOrigin = 'anonymous';

          image.src = imagePath;

          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.style.backgroundColor = 'red';

            const context = canvas.getContext('2d');

            if (!context) {
              return reject(new Error('Missing context'));
            }

            context.drawImage(image, 0, 0, image.width, image.height);

            const stream = canvas.captureStream(0);

            // Necessary to detect if image is loaded
            document.body.appendChild(canvas);
            canvas.style.display = 'none';

            resolve(stream);
          };

          image.onerror = () => {
            reject(new Error('Failed to load image for mock stream'));
          };
        });
      };

      navigator.mediaDevices.getUserMedia = async (constraints: MediaStreamConstraints) => {
        if (constraints.video) {
          return await createMockedStreamFromImage(imagePath);
        }

        throw new Error('Media type not supported');
      };
    }, imgUrl);
  }

  async mockUserCameraWithFace() {
    const imageUrl =
      'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg';

    await this.mockUserCamera(imageUrl);
  }

  async mockUserCameraWithoutFace() {
    const imageUrl =
      'https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg';

    await this.mockUserCamera(imageUrl);
  }
}
