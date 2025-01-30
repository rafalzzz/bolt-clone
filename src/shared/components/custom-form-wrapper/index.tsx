import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TCustomFormWrapper = {
  title: string;
  testId?: string;
};

const CustomFormWrapper: TFCWithChildren<TCustomFormWrapper> = ({ title, children, testId }) => (
  <section
    className='flex w-full lg:w-1/2 justify-center items-center bg-backgroundColor shadow-lg rounded-lg py-6 lg:mr-6 border border-primaryColor transition'
    data-testid={testId}
  >
    <div className='relative flex items-center custom-padding'>
      <div className='w-full z-10'>
        <header>
          <h2 className='text-4xl font-bold transition mb-6 text-textColor'>{title}</h2>
        </header>
        {children}
      </div>
    </div>
  </section>
);

export default CustomFormWrapper;
