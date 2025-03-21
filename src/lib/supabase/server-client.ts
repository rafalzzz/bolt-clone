import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function createClient(req?: NextRequest) {
  const res = new NextResponse();
  const cookieStore = req && res ? req.cookies : await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res?.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  return { supabase, headers: res.headers };
}
