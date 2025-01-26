import LoaderSvg from '@/shared/svg/loader-svg';

const DefaultLoader = () => (
  <div role='status' className='w-full flex items-center justify-center h-[calc(100vh-100px)]'>
    <LoaderSvg className='inline w-12 h-12 animate-spin text-tertiaryColor fill-primaryColor dark:text-tertiaryColor dark:fill-primaryColor transition-all' />
  </div>
);

export default DefaultLoader;
