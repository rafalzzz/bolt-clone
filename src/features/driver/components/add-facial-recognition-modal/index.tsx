import { useTranslations } from 'next-intl';
import type { FC, Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import CustomModal from '@/shared/components/custom-modal';

import useAddFacialRecognition from '@/features/driver/hooks/use-add-facial-recognition';
import useStartVideo from '@/features/driver/hooks/use-handle-video';
import useWindowSize from '@/shared/hooks/use-window-resize';

import { TDriverCompleteRegisterFormSchema } from '@/features/driver/schemas/driver-complete-register-form-schema';

import CameraSvg from '@/shared/svg/camera-svg';

type TAddFacialRecognitionModal = {
  isVisible: boolean;
  setIsAddFacialRecognitionModalEnabled: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<TDriverCompleteRegisterFormSchema>;
  onOk: () => void;
  onCancel: () => void;
};

const PADDING = 80;
const MAX_VIDEO_WIDTH = 696;
const MAX_WIDTH = MAX_VIDEO_WIDTH + PADDING;

const AddFacialRecognitionModal: FC<TAddFacialRecognitionModal> = ({
  isVisible,
  setIsAddFacialRecognitionModalEnabled,
  setValue,
  onOk,
  onCancel,
}) => {
  const t = useTranslations('AddFacialRecognitionModal');

  const { width: windowWidth } = useWindowSize({ maxWidth: MAX_WIDTH });

  const videoWidth = windowWidth - PADDING;
  const videoHeight = videoWidth * 0.75;

  const { videoRef, canvasRef, intervalRef, isVideoLoading, isVideoError } = useStartVideo({
    videoWidth,
    videoHeight,
  });

  const addFacialRecognition = useAddFacialRecognition({
    intervalRef,
    setIsAddFacialRecognitionModalEnabled,
    setValue,
  });

  const displayLoader = isVideoLoading || isVideoError;

  return (
    <CustomModal title={t('title')} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
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
        {displayLoader && (
          <div
            className='absolute top-0 left-0 rounded-sm animate-pulse bg-gray-400/50 dark:bg-white/20'
            style={{ width: videoWidth, height: videoHeight }}
          />
        )}
      </div>

      <button
        onClick={() => addFacialRecognition(videoRef, canvasRef)}
        disabled={displayLoader}
        className='absolute cursor-pointer hover:scale-95 disabled:hover:scale-100 transition-all duration-300 group bottom-6 w-16 h-16 p-7 rounded-full z-20 left-1/2 -translate-x-1/2 default-button-colors'
      >
        <CameraSvg className='text-white w-8 h-8 absolute inset-0 m-auto' />
      </button>
    </CustomModal>
  );
};

export default AddFacialRecognitionModal;
