import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Sanity Studio uses internal iframes — skip X-Frame-Options there
  if (!request.nextUrl.pathname.startsWith("/studio")) {
    response.headers.set("X-Frame-Options", "DENY");
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
