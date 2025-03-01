const isDevelopmentEnvironment = () => process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';

export default isDevelopmentEnvironment;
