import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isPreflight = request.method === "OPTIONS";

  const headers = new Headers();
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
  } else {
    headers.set("Access-Control-Allow-Origin", "*");
  }
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin, Range, X-CSRF-Token"
  );
  headers.set("Access-Control-Max-Age", "86400");

  if (isPreflight) {
    return new NextResponse(null, { status: 204, headers });
  }

  const response = NextResponse.next();
  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
