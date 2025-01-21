import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';

import CustomModal from '@/shared/components/custom-modal';

import useWindowSize from '@/shared/hooks/use-window-resize';

import CameraSvg from '@/shared/svg/camera-svg';
import LoaderSvg from '@/shared/svg/loader-svg';

import useAddFacialRecognition from '../../hooks/use-add-facial-recognition';

type TAddFacialRecognitionModal = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onOk: () => void;
  onCancel: () => void;
};

const PADDING = 80;
const MAX_VIDEO_WIDTH = 696;
const MAX_WIDTH = MAX_VIDEO_WIDTH + PADDING;

const AddFacialRecognitionModal: React.FC<TAddFacialRecognitionModal> = ({
  isVisible,
  setIsVisible,
  onOk,
  onCancel,
}) => {
  const t = useTranslations('AddFacialRecognitionModal');

  const { width: windowWidth } = useWindowSize({ maxWidth: MAX_WIDTH });

  const videoWidth = windowWidth - PADDING;
  const videoHeight = videoWidth * 0.75;

  const { videoRef, canvasRef, isVideoLoading } = useAddFacialRecognition({
    videoWidth,
    videoHeight,
    setIsVisible,
  });

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
        <canvas ref={canvasRef} className='rounded-sm absolute top-0 left-0 z-10'></canvas>
        {isVideoLoading && <div className='absolute z-50 bg-slate-500/50 animate-pulse '></div>}
      </div>

      <button
        /* onClick={() => handleSubmit(videoRef, canvasRef)} */
        className='absolute cursor-pointer hover:scale-95 transition-all duration-300 hover:bg-slate-800 group border-2 border-white/30 shadow-md bottom-6 bg-slate-950 w-16 h-16 p-7 rounded-full z-20 left-1/2 -translate-x-1/2'
      >
        <CameraSvg className='text-white w-8 h-8 absolute group-hover:text-light-blue inset-0 m-auto' />
        {false && <LoaderSvg className='custom-button-loader' />}
      </button>
    </CustomModal>
  );
};

export default AddFacialRecognitionModal;
