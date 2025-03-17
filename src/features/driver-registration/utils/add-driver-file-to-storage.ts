import fs from 'fs';

import type { SupabaseClient } from '@supabase/supabase-js';
import formidable from 'formidable';

import getErrorMessage from '@/shared/utils/common/get-error-message';

type TAddFileToStorageArgs = {
  supabase: SupabaseClient;
  file: formidable.File[] | undefined;
  bucketName: string;
  missingFileMessage: string;
};

const getFileExtension = (fileName: string | null = '') => fileName?.split('.').pop();

const generateFileName = (extension = '') =>
  `drivers/${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

const addFileToStorage = async ({
  supabase,
  file,
  bucketName,
  missingFileMessage,
}: TAddFileToStorageArgs) => {
  const fileToAdd = file?.[0];

  if (!fileToAdd) {
    throw new Error(missingFileMessage);
  }

  const fileBuffer = fs.readFileSync(fileToAdd.filepath);

  const fileExtension = getFileExtension(fileToAdd.originalFilename);
  const fileName = generateFileName(fileExtension);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, { contentType: fileToAdd.mimetype ?? undefined });

  if (error) {
    throw new Error(getErrorMessage(error));
  }

  return data.path;
};

export default addFileToStorage;
