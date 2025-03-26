'use server';

import type { SupabaseClient } from '@supabase/supabase-js';

type TAddFileToStorageParams = {
  file: File;
  authUserId: string;
  bucketName: string;
  supabase: SupabaseClient;
};

const getFileExtension = (fileName: string | null = '') => fileName?.split('.').pop();

const generateFileName = (authUserId: string, extension = '') =>
  `${authUserId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

const addFileToStorage = async ({
  file,
  authUserId,
  bucketName,
  supabase,
}: TAddFileToStorageParams) => {
  const fileExtension = getFileExtension(file.name);
  const fileName = generateFileName(authUserId, fileExtension);

  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
    contentType: file.type || undefined,
  });

  if (error) {
    throw error;
  }

  return data.path;
};

export default addFileToStorage;
