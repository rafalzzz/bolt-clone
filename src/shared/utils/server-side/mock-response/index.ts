import { EMockedResponseType } from '@/shared/enums/mocked-respose-type';

const mockPresets = {
  [EMockedResponseType.SUCCESS]: (response: unknown = { success: true }) =>
    new Promise((resolve) => setTimeout(() => resolve(response), 500)),
  [EMockedResponseType.ERROR]: () => {
    throw new Error('Unknown error');
  },
};

const mockResponse = (responseType: EMockedResponseType) => mockPresets[responseType];

export default mockResponse;
