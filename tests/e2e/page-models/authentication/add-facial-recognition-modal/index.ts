import { expect, type Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';
import { UserCamera } from '@/classes/user-camera';

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
  private userCamera: UserCamera;

  constructor(page: Page, url: string) {
    super(page, url);

    this.userCamera = new UserCamera(page);
  }

  async mockDisabledUserCamera() {
    await this.userCamera.mockDisabledUserCamera();
  }

  async mockUserCameraWithFace() {
    const imageUrl =
      'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg';

    await this.userCamera.mockUserCamera(imageUrl);
  }

  async mockUserCameraWithoutFace() {
    const imageUrl =
      'https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg';

    await this.userCamera.mockUserCamera(imageUrl);
  }

  async assertAddFacialRecognitionButtonIsDisabled() {
    return this.assertButtonIsDisabled(this.addFacialRecognitionButtonTestId);
  }

  async assertModalSubmitButtonIsDisabled() {
    return this.assertButtonIsDisabled(this.modalSubmitButtonTestId);
  }

  async assertRequiredCameraErrorToastMessage() {
    await this.checkToastMessage(
      ADD_FACIAL_RECOGNITION_ERROR,
      'To add a facial photo, access to the camera is required',
    );
  }

  async assertFaceNotDetectedErrorToastMessage() {
    await this.checkToastMessage(
      ADD_FACIAL_RECOGNITION_ERROR,
      'No face detected in the photo - please do not move while taking the picture',
    );
  }

  async assertPhotoNotAddedErrorToastMessage() {
    await this.checkToastMessage(
      ADD_FACIAL_RECOGNITION_ERROR,
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
    await expect(modal).toBeHidden();
  }

  async waitForDrawMarksOnDetectedFace() {
    await this.page.waitForTimeout(2000);
  }

  async addFacialRecognition() {
    // Necessary to draw marks on detected face
    await this.page.waitForTimeout(1000);

    await this.clickAddFacialRecognitionButton();
    await this.clickModalSubmitButton();

    const addFacialRecognitionModal = await this.waitForElementWithTestId(
      ADD_FACIAL_RECOGNITION_MODAL,
    );

    await expect(addFacialRecognitionModal).toBeHidden();
  }
}
