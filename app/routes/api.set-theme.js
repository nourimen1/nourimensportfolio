// Use Node runtime for Netlify, Cloudflare for Cloudflare Pages
// Note: This is determined at build time by remix.config.cjs serverBuildTarget
// For Netlify builds, Remix will use @remix-run/node automatically
import { json, createCookieSessionStorage } from '@remix-run/cloudflare';

export async function action({ request, context }) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [
        (context?.cloudflare?.env?.SESSION_SECRET) || 
        (process.env.SESSION_SECRET) || 
        ' '
      ],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
