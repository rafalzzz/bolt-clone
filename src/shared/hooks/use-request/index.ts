import useRequestState, { type THandleRequestErrorArgs } from '../use-request-state';

type TRequestArgs = {
  endpoint: string;
  method: RequestInit['method'];
  headers?: RequestInit['headers'];
  data?: unknown;
  addHeaders?: boolean;
  errorMessage?: THandleRequestErrorArgs;
};

const useRequest = () => {
  const { state, startRequest, handleSuccess, handleRequestError } = useRequestState();

  const getRequestBody = (data: unknown) => {
    if (!data) {
      return null;
    }

    if (data instanceof FormData) {
      return data;
    }

    return JSON.stringify(data);
  };

  const handleRequest = async ({
    endpoint,
    method,
    headers = {
      'Content-Type': 'application/json',
    },
    data,
    addHeaders = true,
    errorMessage = {},
  }: TRequestArgs) => {
    startRequest();

    try {
      const response = await fetch(`/api${endpoint}`, {
        method,
        headers: addHeaders ? { ...headers } : undefined,
        body: getRequestBody(data),
        credentials: 'include',
      });

      if (!response.ok) {
        throw response;
      }

      handleSuccess();

      return response;
    } catch (error) {
      handleRequestError(errorMessage, error);
    }
  };

  return {
    state,
    handleRequest,
  };
};

export default useRequest;
