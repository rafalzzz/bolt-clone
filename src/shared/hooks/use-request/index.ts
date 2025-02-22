import { useReducer } from 'react';

import displayToast from '@/shared/utils/client-side/display-toast';

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

type THandleRequestErrorParams = Record<'uniqueMessage' | 'testId', string>;

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

  const handleRequestError =
    ({ uniqueMessage, testId }: THandleRequestErrorParams) =>
    (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : uniqueMessage;

      handleError(errorMessage);

      displayToast({
        text: errorMessage,
        testId,
      });
    };

  return {
    state,
    startRequest,
    handleSuccess,
    handleRequestError,
  };
};

export default useRequest;
