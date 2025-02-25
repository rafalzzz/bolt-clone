const throwError = (error: unknown) => {
  const isErrorMessage = error && typeof error === 'object' && 'message' in error;

  const errorMessage =
    isErrorMessage && typeof error.message === 'string' ? error.message : 'Unknown error';

  throw new Error(errorMessage);
};

export default throwError;
