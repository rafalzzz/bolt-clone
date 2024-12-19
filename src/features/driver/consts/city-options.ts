import { TGroupedOption } from '@/shared/types/react-select';

export const CITY_OPTIONS: Readonly<TGroupedOption[]> = [
  {
    label: 'poland',
    options: [
      { value: 'rzeszow', label: 'rzeszow' },
      { value: 'warsaw', label: 'warsaw' },
    ],
    icon: 'https://hatscripts.github.io/circle-flags/flags/pl.svg',
  },
];
