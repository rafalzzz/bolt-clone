import { TRootLayout } from '@/shared/types/root-layout';

import '@/styles/components/custom-padding.css';
import '@/styles/components/default-button.css';
import '@/styles/components/default-button-colors.css';
import '@/styles/globals.css';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout = ({ children }: TRootLayout) => {
  return children;
};

export default RootLayout;
