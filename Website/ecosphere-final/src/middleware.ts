// src/app/middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  // Add more protected routes here if needed
]);

export default clerkMiddleware(async (auth, request) => {
  const userId = (await auth()).userId;

  if (isProtectedRoute(request) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/dashboard", "/(api|trpc)(.*)"],
};
