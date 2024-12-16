type TPageDescription = {
  description: string;
  secondaryDescription: string;
};

const PageDescription = ({ description, secondaryDescription }: TPageDescription) => (
  <div className='flex w-full lg:w-2/3 items-center mx-auto px-0 sm:px-6 lg:px-6'>
    <div className='w-full mx-auto flex flex-col items-start lg:space-y-6 lg:pr-40 lg:px-0 py-20'>
      <h1 className='text-white font-bold font-sans w-1/2 lg:text-6xl lg:leading-tight text-3xl lg:w-full'>
        {description}
      </h1>
      <p className='text-white mt-1 font-sans w-1/2 lg:text-lg lg:w-full'>{secondaryDescription}</p>
    </div>
  </div>
);

export default PageDescription;
