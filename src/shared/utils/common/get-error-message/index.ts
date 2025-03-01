const getErrorMessage = (error: unknown) => {
  const isErrorMessage = error && typeof error === 'object' && 'message' in error;

  return isErrorMessage && typeof error.message === 'string' ? error.message : 'Unknown error';
};

export default getErrorMessage;
