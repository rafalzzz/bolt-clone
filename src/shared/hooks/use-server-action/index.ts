import useRequestState, { THandleRequestErrorArgs } from '../use-request-state';

type TRequestAction<TArgs, TResponse> = {
  action: (args: TArgs) => Promise<TResponse>;
  onSuccess?: (response?: TResponse) => void;
  actionArgs: TArgs;
  errorMessage?: THandleRequestErrorArgs;
};

const useServerAction = () => {
  const { state, startRequest, handleSuccess, handleRequestError } = useRequestState();

  const handleServerAction = async <TArgs, TResponse>({
    action,
    onSuccess,
    actionArgs,
    errorMessage = {},
  }: TRequestAction<TArgs, TResponse>): Promise<TResponse | undefined> => {
    startRequest();

    try {
      const response = await action(actionArgs);

      handleSuccess();
      onSuccess?.(response);

      return response;
    } catch (error) {
      handleRequestError(errorMessage, error);
    }
  };

  return {
    state,
    handleServerAction,
  };
};

export default useServerAction;
