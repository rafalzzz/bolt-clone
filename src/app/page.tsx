import { redirect } from 'next/navigation';

import { DEFAULT_LANGUAGE } from '@/shared/consts/languages';

export default function RootPage() {
  redirect(DEFAULT_LANGUAGE);
}
