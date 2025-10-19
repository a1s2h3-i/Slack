// middleware.ts

import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Public pages like login or signup
const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const authenticated = await isAuthenticatedNextjs();

  // If user is NOT authenticated and visiting a protected page → redirect to signin
  if (!isPublicPage(request) && !authenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // If user IS authenticated and visiting the signin/signup → redirect to home
  if (isPublicPage(request) && authenticated) {
    return nextjsMiddlewareRedirect(request, "/");
  }

  // Otherwise allow the request
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
