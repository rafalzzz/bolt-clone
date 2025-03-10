import formidable from 'formidable';
import { NextApiRequest } from 'next';

const form = formidable({
  multiples: true,
  keepExtensions: true,
});

const getFomidableValues = (
  fields: formidable.Fields<string>,
): Record<string, string[] | undefined> =>
  Object.entries(fields).reduce((acc, [key, value]) => ({ ...acc, [key]: value?.[0] }), {});

const parseForm = async (req: NextApiRequest) =>
  new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({
        fields: getFomidableValues(fields) as ReturnType<typeof getFomidableValues>,
        files,
      });
    });
  });

export default parseForm;
