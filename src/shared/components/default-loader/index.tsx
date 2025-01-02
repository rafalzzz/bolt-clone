import LoaderSvg from '../loader-svg';
import './default-loader.scss';

const DefaultLoader = () => (
  <div role='status' className='default-loader'>
    <LoaderSvg className='default-loader__svg' />
  </div>
);

export default DefaultLoader;
