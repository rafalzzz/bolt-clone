import fs from 'fs';

import formidable from 'formidable';

import { supabase } from '@/lib/supabase/api-client';

import getErrorMessage from '@/shared/utils/common/get-error-message';

type TAddFileToStorageParams = {
  file: formidable.File[] | undefined;
  bucketName: string;
  missingFileMessage: string;
};

const getFileExtension = (fileName: string | null = '') => fileName?.split('.').pop();

const generateFileName = (extension = '') =>
  `drivers/${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

const addFileToStorage = async ({
  file,
  bucketName,
  missingFileMessage,
}: TAddFileToStorageParams) => {
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
