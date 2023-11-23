import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "https://liga-de-tenis-ryuksan.vercel.app/",
    "https://liga-de-tenis-ryuksan.vercel.app/api/user/:id",
    "https://liga-de-tenis-ryuksan.vercel.app/api/user",
    "https://liga-de-tenis-ryuksan.vercel.app/api/tournament",
    "https://liga-de-tenis-ryuksan.vercel.app/api/tournament/:id",
    "https://liga-de-tenis-ryuksan.vercel.app/api/tournament/:id/:id",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
