const getErrorMessage = (error: unknown): string | undefined => {
  if (error && typeof error === 'object' && 'message' in error) {
    return error.message as string;
  }

  if (typeof error === 'string') {
    return error;
  }
};

export default getErrorMessage;
