'use server';

import { getTranslations } from 'next-intl/server';

const getServerActionTranslations = async (locale: string, namespace: string) =>
  await getTranslations({
    locale,
    namespace,
  });

export default getServerActionTranslations;
