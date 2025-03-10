import { useReducer } from 'react';

import displayToast from '@/shared/utils/client-side/display-toast';

type THandleRequestErrorParams = Partial<Record<'uniqueMessage' | 'testId', string>>;

type TRequestParams = {
  endpoint: string;
  method: RequestInit['method'];
  headers?: RequestInit['headers'];
  data?: unknown;
  addHeaders?: boolean;
  errorMessage?: THandleRequestErrorParams;
};

type TState = {
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
};

const enum EAction {
  START = 'start',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TAction =
  | { type: EAction.START }
  | { type: EAction.SUCCESS }
  | { type: EAction.ERROR; error: string };

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
};

const requestReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case EAction.START:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        error: null,
      };
    case EAction.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    case EAction.ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.error,
      };
    default:
      return { ...state };
  }
};

const useRequest = () => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const startRequest = () => {
    dispatch({ type: EAction.START });
  };

  const handleSuccess = () => {
    dispatch({ type: EAction.SUCCESS });
  };

  const handleError = (error: string) => {
    dispatch({ type: EAction.ERROR, error });
  };

  const getResponseError = async (response: Response) => {
    try {
      const errorData = await response.json();

      return errorData.message;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: unknown) {
      return await response.text();
    }
  };

  const getErrorMessage = async (error: unknown) => {
    if (error instanceof Response) {
      const responseError = await getResponseError(error);

      if (responseError) {
        return responseError;
      }
    } else if (error instanceof Error) {
      return error.message;
    }
  };

  const handleRequestError = async (
    { uniqueMessage = '', testId }: THandleRequestErrorParams,
    error: unknown,
  ) => {
    let text = uniqueMessage;

    const errorMessage = await getErrorMessage(error);

    if (errorMessage) {
      text = errorMessage;
    }

    handleError(text);

    if (text) {
      displayToast({
        text,
        testId,
      });
    }
  };

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
  }: TRequestParams) => {
    startRequest();

    try {
      const response = await fetch(`/api${endpoint}`, {
        method,
        headers: addHeaders ? { ...headers } : undefined,
        body: getRequestBody(data),
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
