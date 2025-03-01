import { useTranslations } from 'next-intl';

import { TOption } from '@/shared/types/react-select';

export const COLORS = [
  'white',
  'black',
  'silver',
  'gray',
  'blue',
  'red',
  'brown',
  'beige',
  'green',
  'orange',
  'yellow',
];

const useColorOptions = () => {
  const t = useTranslations('ColorSelect');

  const colorOptions: TOption[] = COLORS.map((value) => ({
    label: t(value),
    value,
  }));

  return colorOptions;
};

export default useColorOptions;
