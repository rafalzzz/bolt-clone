import { useTranslations } from 'next-intl';

import CustomModal from '@/shared/components/custom-modal';

import CameraSvg from '@/shared/svg/camera-svg';
import LoaderSvg from '@/shared/svg/loader-svg';

import useAddFacialRecognition from '../../hooks/use-add-facial-recognition';

type TAddFaceIdModal = {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const AddFacialRecognitionModal: React.FC<TAddFaceIdModal> = ({ isVisible, onOk, onCancel }) => {
  const t = useTranslations('AddFaceIdModal');

  const { videoRef, canvasRef, isVideoLoading } = useAddFacialRecognition();

  return (
    <CustomModal title={t('title')} isVisible={isVisible} onOk={onOk} onCancel={onCancel}>
      <div className='relative w-full h-auto' style={{ width: '696px', height: '522px' }}>
        <video
          ref={videoRef}
          id='video'
          width='696'
          height='522'
          className='rounded-sm absolute top-0 left-0 w-full h-full'
          autoPlay
          muted
        ></video>
        <canvas
          ref={canvasRef}
          className='rounded-sm absolute top-0 left-0 w-full h-full z-10'
        ></canvas>
        {isVideoLoading && (
          <div className='absolute z-50 bg-slate-500/50 animate-pulse inset-0 w-full h-full'></div>
        )}
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
