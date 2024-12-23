import { FC, PropsWithChildren } from 'react';

import '@/styles/components/custom-padding.css';
import '@/styles/components/default-button.css';
import '@/styles/components/default-button-colors.css';
import '@/styles/globals.css';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default RootLayout;
