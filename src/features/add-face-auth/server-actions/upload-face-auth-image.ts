'use server';

import { createClient } from '@/lib/supabase/server-client';

import addFilePathToDriverEntity from '@/features/add-face-auth/server-actions/add-file-path-to-driver-entity';
import addFileToStorage from '@/features/add-face-auth/server-actions/add-file-to-storage';

import generateRedirectPath from '@/shared/utils/server-side/generate-redirect-path';
import getLocaleValue from '@/shared/utils/server-side/get-locale-value';
import getMockActionCookie from '@/shared/utils/server-side/get-mock-action-cookie';
import getServerActionTranslations from '@/shared/utils/server-side/get-server-action-translations';
import getUserId from '@/shared/utils/server-side/get-user-id';
import mockResponse from '@/shared/utils/server-side/mock-response';

const uploadFaceImageAction = async (file: File) => {
  const locale = await getLocaleValue();
  const mockAction = await getMockActionCookie();

  if (mockAction) {
    return mockResponse(mockAction)?.(generateRedirectPath(locale, '/driver/auth/'));
  }

  const t = await getServerActionTranslations(locale, 'AddCarAction');

  const supabase = await createClient(false);

  const authUserId = await getUserId(supabase, t('authError'));

  const filePath = await addFileToStorage({
    file,
    authUserId,
    bucketName: 'driver_files',
    supabase,
  });

  addFilePathToDriverEntity({ filePath, authUserId, supabase });

  return { success: true };
};

export default uploadFaceImageAction;
