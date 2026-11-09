import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      {
        success: false,
        message: "GITHUB_CLIENT_ID not configured in .env.local yet. Please see docs.",
      },
      { status: 500 }
    );
  }

  const callbackBase = process.env.NEXT_PUBLIC_APP_URL || "https://snipenthubbaceknd.vercel.app";
  const redirectUri = `${callbackBase}/api/auth/github/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=user:email`;

  return NextResponse.redirect(githubAuthUrl);
}

