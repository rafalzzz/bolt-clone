import { type Page } from '@playwright/test';

export class UserCamera {
  constructor(private readonly page: Page) {}

  async mockDisabledUserCamera() {
    await this.page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async (constraints: MediaStreamConstraints) => {
        if (constraints.video || constraints.audio) {
          throw new DOMException('Permission denied', 'NotAllowedError');
        }
        throw new Error('Media type not supported');
      };
    });

    await this.page.reload();
  }

  async mockUserCameraFromImage(imgUrl: string) {
    await this.page.addInitScript((imagePath) => {
      navigator.mediaDevices.getUserMedia = async (constraints: MediaStreamConstraints) => {
        if (!constraints.video) {
          throw new Error('Media type not supported');
        }

        return await new Promise<MediaStream>((resolve, reject) => {
          const image = new Image();
          image.crossOrigin = 'anonymous';
          image.src = imagePath;

          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Missing canvas context'));

            ctx.drawImage(image, 0, 0);

            setInterval(() => ctx.drawImage(image, 0, 0), 100);

            const stream = canvas.captureStream(10);

            resolve(stream);
          };

          image.onerror = () => reject(new Error('Image failed to load'));
        });
      };
    }, imgUrl);

    await this.page.reload();
  }

  async mockUserCameraWithFace() {
    await this.mockUserCameraFromImage(
      'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg',
    );
  }

  async mockUserCameraWithoutFace() {
    await this.mockUserCameraFromImage(
      'https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg',
    );
  }
}
