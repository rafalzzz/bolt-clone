const isTestingEnvironment = () => process.env.NEXT_PUBLIC_ENVIRONMENT === 'testing';

export default isTestingEnvironment;
