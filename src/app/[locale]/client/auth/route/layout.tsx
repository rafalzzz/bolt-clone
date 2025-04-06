import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Client route page',
  description: 'This is the client route page.',
};

const ClientRoutePage: TFCWithChildren = ({ children }) => children;

export default ClientRoutePage;
