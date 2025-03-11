import { useTranslations } from 'next-intl';

import { TGroupedOption } from '@/shared/types/react-select';

export const CITIES = [
  {
    country: 'poland',
    cities: ['rzeszow', 'warsaw'],
    icon: 'https://hatscripts.github.io/circle-flags/flags/pl.svg',
  },
];

const useCityOptions = () => {
  const t = useTranslations('CitySelect');

  const cityOptions: TGroupedOption[] = CITIES.map(({ country, cities, icon }) => ({
    label: t(country),
    options: cities.map((value) => ({ value, label: t(value) })),
    icon,
  }));

  return cityOptions;
};

export default useCityOptions;
