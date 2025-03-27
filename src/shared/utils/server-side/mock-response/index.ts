import { EMockedResponseType } from '@/shared/enums/mocked-respose-type';

const mockPresets = {
  [EMockedResponseType.SUCCESS]: () => ({ status: 'ok', mock: true }),
  [EMockedResponseType.ERROR]: () => {
    throw new Error('Mock error');
  },
};

const mockResponse = (responseType: EMockedResponseType) => mockPresets[responseType];

export default mockResponse;
