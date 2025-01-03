import LoaderSvg from '@/shared/svg/loader-svg';

import './default-loader.scss';

const DefaultLoader = () => (
  <div role='status' className='default-loader'>
    <LoaderSvg className='default-loader__svg' />
  </div>
);

export default DefaultLoader;
