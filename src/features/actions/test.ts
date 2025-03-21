'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const refresh = async (path: string) => {
  revalidatePath(path, 'layout');
  redirect(path);
};

export default refresh;
