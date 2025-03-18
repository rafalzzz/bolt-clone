import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export function createAuthMiddleware() {
  return async function authMiddleware(request: NextRequest, response: NextResponse) {
    const supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_API_URL!,
      process.env.NEXT_PUBLIC_API_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Get user error:', error.message);
    }

    if (!user) {
      const { data, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.error('Refresh session error:', refreshError.message);
      } else {
        console.log('Session has been refreshed:', data);
      }
    }

    return supabaseResponse;
  };
}
