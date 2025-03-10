import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TPageError = {
  testId?: string;
};

const PageError: TFCWithChildren<TPageError> = ({ children, testId }) => (
  <div className='flex w-full h-[calc(100vh-100px)] min-h-[300px] items-center justify-center text-justify px-5'>
    <h1 className='text-2xl font-bold text-textColor' data-testid={testId}>
      {children}
    </h1>
  </div>
);

export default PageError;
