import { TFCWithChildren } from '@/shared/types/fc-with-children';

const ContentWrapper: TFCWithChildren = ({ children }) => (
  <main className='flex flex-wrap items-center justify-center mx-auto w-full p-0 max-w-5xl py-3'>
    <div className='h-auto w-full flex p-0 lg:flex-row flex-col'>{children}</div>
  </main>
);

export default ContentWrapper;
