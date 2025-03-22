import { UserMetadata } from '@supabase/supabase-js';

import generateRedirectPath from '@/shared/utils/server-side/generate-redirect-path';

const getRedirectPath = ({ carAdded, faceAuth }: UserMetadata, locale: string) => {
  if (!carAdded) {
    return generateRedirectPath(locale, '/driver/auth/add-car');
  }

  if (!faceAuth) {
    return generateRedirectPath(locale, '/driver/auth/add-face-auth');
  }

  return generateRedirectPath(locale, '/');
};

export default getRedirectPath;
