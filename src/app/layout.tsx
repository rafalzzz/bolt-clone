import { ReactNode } from 'react';

import '@/styles/globals.css';

type TRootLayout = Readonly<{
  children: ReactNode;
}>;

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout = ({ children }: TRootLayout) => {
  return children;
};

export default RootLayout;
