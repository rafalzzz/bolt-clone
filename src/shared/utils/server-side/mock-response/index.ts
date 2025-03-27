import { EMockedResponseType } from '@/shared/enums/mocked-respose-type';

const mockPresets = {
  [EMockedResponseType.SUCCESS]: () => ({ success: true }),
  [EMockedResponseType.ERROR]: () => {
    throw new Error('Unknown error');
  },
};

const mockResponse = (responseType: EMockedResponseType) => mockPresets[responseType];

export default mockResponse;
