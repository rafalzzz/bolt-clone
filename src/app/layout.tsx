import { FC, PropsWithChildren } from 'react';

import '@/styles/components/custom-close-button.scss';
import '@/styles/components/custom-padding.scss';
import '@/styles/components/default-button.scss';
import '@/styles/components/default-button-colors.scss';
import '@/styles/components/default-cancel-button-colors.scss';
import '@/styles/globals.scss';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default RootLayout;
