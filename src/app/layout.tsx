import { TFCWithChildren } from '@/shared/types/fc-with-children';

import '@/styles/components/custom-input.scss';
import '@/styles/components/custom-padding.scss';
import '@/styles/components/menu-item.scss';
import '@/styles/components/primary-button.scss';
import '@/styles/components/secondary-button.scss';
import '@/styles/globals.scss';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout: TFCWithChildren = ({ children }) => {
  return children;
};

export default RootLayout;
