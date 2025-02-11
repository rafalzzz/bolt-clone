import { TFCWithChildren } from '@/shared/types/fc-with-children';

const PageError: TFCWithChildren = ({ children }) => (
  <div className='flex w-full h-[calc(100vh-100px)] min-h-[300px] items-center justify-center text-justify px-5'>
    <h1 className='text-2xl font-bold text-textColor'>{children}</h1>
  </div>
);

export default PageError;
