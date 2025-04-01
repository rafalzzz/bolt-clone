import { expect, type Page } from '@playwright/test';

import { BaseForm } from '@/classes/base-form';
import { UserCamera } from '@/classes/user-camera';

import { baseURL } from '@/config/playwright.config';

import {
  ADD_FACE_AUTH_DESCRIPTION,
  ENABLE_FACE_AUTH_MODAL_BUTTON,
  ADD_FACE_AUTH_MODAL,
  ADD_FACE_AUTH_BUTTON,
  ADD_FACE_AUTH_CANCEL_BUTTON,
  ADD_FACE_AUTH_SUBMIT_BUTTON,
  ADD_FACE_AUTH_ERROR_MESSAGE,
} from '@/test-ids/add-face-auth-page';

import { ELanguage } from '@/enums/language';

export class AddFaceAuthPage extends BaseForm {
  readonly openAddFaceAuthModalButtonTestId: string = ENABLE_FACE_AUTH_MODAL_BUTTON;
  readonly addFaceAuthButtonTestId: string = ADD_FACE_AUTH_BUTTON;
  readonly modalCancelButtonTestId: string = ADD_FACE_AUTH_CANCEL_BUTTON;
  readonly modalSubmitButtonTestId: string = ADD_FACE_AUTH_SUBMIT_BUTTON;
  private userCamera: UserCamera;

  constructor(page: Page, language: ELanguage = ELanguage.EN) {
    super(page, `${baseURL}/${language}/driver/auth/add-face-auth`);

    this.userCamera = new UserCamera(page);
  }

  // Check general layout methods
  async assertPageLayoutVisible() {
    const pageElementIds: string[] = [
      ADD_FACE_AUTH_DESCRIPTION,
      this.openAddFaceAuthModalButtonTestId,
    ];

    await this.assertPageElementsVisibility(pageElementIds);
  }

  async openAddFacialRecognitionModal() {
    await this.clickButton(this.openAddFaceAuthModalButtonTestId);
  }

  // Camera methods
  async mockDisabledUserCamera() {
    await this.userCamera.mockDisabledUserCamera();
  }

  async mockUserCameraWithFace() {
    await this.userCamera.mockUserCameraWithFace();
  }

  async mockUserCameraWithoutFace() {
    await this.userCamera.mockUserCameraWithoutFace();
  }

  // Facial recognition error methods
  async assertRequiredCameraErrorToastMessage() {
    await this.checkToastMessage(
      ADD_FACE_AUTH_ERROR_MESSAGE,
      'To add a facial photo, access to the camera is required',
    );
  }

  async assertFaceNotDetectedErrorToastMessage() {
    await this.checkToastMessage(
      ADD_FACE_AUTH_ERROR_MESSAGE,
      'No face detected in the photo - please do not move while taking the picture',
    );
  }

  async assertPhotoNotAddedErrorToastMessage() {
    await this.checkToastMessage(
      ADD_FACE_AUTH_ERROR_MESSAGE,
      'The photo for face authorization has not been added',
    );
  }

  async assertUnknownErrorToastMessage() {
    await this.checkToastMessage(ADD_FACE_AUTH_ERROR_MESSAGE, 'Unknown error');
  }

  // Modal buttons methods
  async assertAddFaceAuthButtonIsDisabled() {
    return this.assertButtonIsDisabled(this.addFaceAuthButtonTestId);
  }

  async assertModalSubmitButtonIsDisabled() {
    return this.assertButtonIsDisabled(this.modalSubmitButtonTestId);
  }

  async clickModalSubmitButton() {
    await this.clickButton(this.modalSubmitButtonTestId);
  }

  async clickAddFaceAuthButton() {
    await this.clickButton(this.addFaceAuthButtonTestId);
  }

  // General facial recognition methods
  private async assertModalIsNotVisible() {
    const addFaceAuthModal = await this.waitForElementWithTestId(ADD_FACE_AUTH_MODAL);

    await expect(addFaceAuthModal).toBeHidden();
  }

  async addFaceAuth() {
    // Necessary to draw marks on detected face
    await this.page.waitForTimeout(1000);

    await this.clickAddFaceAuthButton();
    await this.clickModalSubmitButton();
    await this.assertModalIsNotVisible();
  }
}
