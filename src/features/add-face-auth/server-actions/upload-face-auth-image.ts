'use server';

import { createClient } from '@/lib/supabase/server-client';

import addFilePathToDriverEntity from '@/features/add-face-auth/server-actions/add-file-path-to-driver-entity';
import addFileToStorage from '@/features/add-face-auth/server-actions/add-file-to-storage';

import getLocaleValue from '@/shared/utils/server-side/get-locale-value';
import getServerActionTranslations from '@/shared/utils/server-side/get-server-action-translations';
import getUserId from '@/shared/utils/server-side/get-user-id';

const uploadFaceImageAction = async (file: File) => {
  const locale = await getLocaleValue();
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
