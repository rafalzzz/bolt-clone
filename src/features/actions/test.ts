'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const refresh = async () => {
  'use server';

  revalidatePath('/', 'layout');
  redirect('/');
};

export default refresh;
