'use server';

import { cookies } from 'next/headers';

const getServerCookie = async (cookieName: string) => (await cookies()).get(cookieName);

export default getServerCookie;
