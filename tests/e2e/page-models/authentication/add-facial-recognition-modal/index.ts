import { expect, Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';

import {
  ADD_FACIAL_RECOGNITION_BUTTON,
  ADD_FACIAL_RECOGNITION_CANCEL_BUTTON,
  ADD_FACIAL_RECOGNITION_ERROR,
  ADD_FACIAL_RECOGNITION_MODAL,
  ADD_FACIAL_RECOGNITION_SUBMIT_BUTTON,
} from '@/test-ids/add-facial-recognition-modal';

export class AddFacialRecognitionModal extends BaseForm {
  readonly addFacialRecognitionButtonTestId: string = ADD_FACIAL_RECOGNITION_BUTTON;
  readonly modalCancelButtonTestId: string = ADD_FACIAL_RECOGNITION_CANCEL_BUTTON;
  readonly modalSubmitButtonTestId: string = ADD_FACIAL_RECOGNITION_SUBMIT_BUTTON;

  constructor(page: Page, url: string) {
    super(page, url);
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

  private async mockUserCamera(imgUrl: string) {
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

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, image.width, image.height);

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

  async assertAddFacialRecognitionButtonIsDisabled() {
    return this.assertButtonIsDisabled(this.addFacialRecognitionButtonTestId);
  }

  async assertModalSubmitButtonIsDisabled() {
    return this.assertButtonIsDisabled(this.modalSubmitButtonTestId);
  }

  async assertFacialRecognitionErrorToastMessage(message: string) {
    const errorMessage = await this.waitForElementWithTestId(ADD_FACIAL_RECOGNITION_ERROR);
    await this.checkElementTextContent(errorMessage, message);
  }

  async assertRequiredCameraErrorToastMessage() {
    await this.assertFacialRecognitionErrorToastMessage(
      'To add a facial photo, access to the camera is required',
    );
  }

  async assertFaceNotDetectedErrorToastMessage() {
    await this.assertFacialRecognitionErrorToastMessage(
      'No face detected in the photo - please do not move while taking the picture',
    );
  }

  async assertPhotoNotAddedErrorToastMessage() {
    await this.assertFacialRecognitionErrorToastMessage(
      'The photo for facial recognition has not been added',
    );
  }

  async clickModalSubmitButton() {
    await this.clickButton(this.modalSubmitButtonTestId);
  }

  async clickAddFacialRecognitionButton() {
    await this.clickButton(this.addFacialRecognitionButtonTestId);
  }

  async assertModalIsNotVisible() {
    const modal = this.getElementByTestId(ADD_FACIAL_RECOGNITION_MODAL);
    await expect(modal).not.toBeVisible();
  }

  async addFacialRecognition() {
    await this.mockUserCameraWithFace();

    // Necessary to check if image is loaded
    await this.page.waitForSelector('canvas', { state: 'attached' });

    // Necessary to draw marks on detected face
    await this.page.waitForTimeout(1000);

    await this.clickAddFacialRecognitionButton();
    await this.clickModalSubmitButton();
  }
}
