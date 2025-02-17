import { Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import {
  ADD_FACIAL_RECOGNITION_BUTTON,
  ADD_FACIAL_RECOGNITION_CANCEL_BUTTON,
  ADD_FACIAL_RECOGNITION_ERROR,
  ADD_FACIAL_RECOGNITION_SUBMIT_BUTTON,
} from '@/test-ids/add-facial-recognition-modal';

export class AddFacialRecognitionModal extends BaseForm {
  readonly addFacialRecognitionButtonTestId: string = ADD_FACIAL_RECOGNITION_BUTTON;
  readonly modalCancelButtonTestId: string = ADD_FACIAL_RECOGNITION_CANCEL_BUTTON;
  readonly modalSubmitButtonTestId: string = ADD_FACIAL_RECOGNITION_SUBMIT_BUTTON;
  readonly imageWidth: number = 696;
  readonly imageHeight: number = 522;

  constructor(page: Page) {
    super(page, '');
  }

  async mockUserCamera() {
    const faceImagePath =
      'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg';

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

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);

            const stream = canvas.captureStream(0);
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
    }, faceImagePath);
  }

  async assertAddFacialRecognitionModal() {
    const pageElementIds: string[] = [
      this.addFacialRecognitionButtonTestId,
      this.modalCancelButtonTestId,
      this.modalSubmitButtonTestId,
    ];

    return this.assertPageElementsVisibility(pageElementIds);
  }

  async clickModalSubmitButton() {
    await this.page.waitForTimeout(5000);

    await this.clickButton(this.modalSubmitButtonTestId);
  }

  async assertErrorToastMessage() {
    const errorMessage = await this.waitForElementWithTestId(ADD_FACIAL_RECOGNITION_ERROR);

    await this.checkElementTextContent(
      errorMessage,
      'The photo for facial recognition has not been added.',
    );
  }
}
