import { useTranslations } from 'next-intl';
import { useState, type FC } from 'react';

import CustomModal from '@/shared/components/custom-modal';

import useAddFaceAuth from '@/features/add-face-auth/hooks/use-add-face-auth';
import useStartVideo from '@/features/add-face-auth/hooks/use-handle-video';
import useUploadFaceAuthImage from '@/features/add-face-auth/hooks/use-upload-face-auth-image';
import useWindowSize from '@/shared/hooks/use-window-resize';

import {
  ADD_FACE_AUTH_BUTTON,
  ADD_FACE_AUTH_CANCEL_BUTTON,
  ADD_FACE_AUTH_MODAL,
  ADD_FACE_AUTH_SUBMIT_BUTTON,
} from '@/test-ids/add-face-auth-page';

import CameraSvg from '@/shared/svg/camera-svg';

type TAddFaceAuthModal = {
  isVisible: boolean;
  onCancel: () => void;
};

const PADDING = 80;
const MAX_VIDEO_WIDTH = 696;
const MAX_WIDTH = MAX_VIDEO_WIDTH + PADDING;

const AddFaceAuthModal: FC<TAddFaceAuthModal> = ({ isVisible, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);

  const t = useTranslations('AddFaceAuthModal');

  const { width: windowWidth } = useWindowSize({ maxWidth: MAX_WIDTH });

  const videoWidth = windowWidth - PADDING;
  const videoHeight = videoWidth * 0.75;

  const { videoRef, canvasRef, intervalRef, isVideoLoading, isVideoError } = useStartVideo({
    videoWidth,
    videoHeight,
  });

  const {
    state: { isLoading, isSuccess },
    uploadFaceAuthImage,
  } = useUploadFaceAuthImage();

  const addFaceAuth = useAddFaceAuth({
    intervalRef,
    setFile,
  });

  const isCameraDisabled = isVideoLoading || isVideoError;

  return (
    <CustomModal
      title={t('title')}
      isVisible={isVisible}
      okButtonTestId={ADD_FACE_AUTH_SUBMIT_BUTTON}
      cancelButtonTestId={ADD_FACE_AUTH_CANCEL_BUTTON}
      modalTestId={ADD_FACE_AUTH_MODAL}
      onCancel={onCancel}
      okButtonProps={{
        onClick: () => uploadFaceAuthImage(file),
        disabled: isCameraDisabled || isLoading || isSuccess,
      }}
    >
      <div className='relative h-auto' style={{ width: videoWidth, height: videoHeight }}>
        <video
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          id='video'
          className='rounded-sm absolute top-0 left-0 flex'
          autoPlay
          muted
        ></video>
        <canvas ref={canvasRef} className='rounded-sm absolute top-0 left-0 z-10' />
        {isCameraDisabled && (
          <div
            className='absolute top-0 left-0 rounded-sm animate-pulse bg-modalVideoLoaderColor'
            style={{ width: videoWidth, height: videoHeight }}
          />
        )}
      </div>

      <button
        onClick={() => addFaceAuth(videoRef, canvasRef)}
        disabled={isCameraDisabled}
        data-testid={ADD_FACE_AUTH_BUTTON}
        className='absolute cursor-pointer hover:scale-95 disabled:hover:scale-100 transition-all duration-300 group bottom-6 w-16 h-16 p-7 rounded-full z-20 left-1/2 -translate-x-1/2 primary-button'
      >
        <CameraSvg className='w-8 h-8 absolute inset-0 m-auto text-buttonTextColor' />
      </button>
    </CustomModal>
  );
};

export default AddFaceAuthModal;
