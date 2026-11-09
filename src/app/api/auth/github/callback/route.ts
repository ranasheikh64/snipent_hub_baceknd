import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", req.url));
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("Failed to get GitHub token");

    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/json" },
    });
    const githubUser = await userRes.json();

    const emailsRes = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/json" },
    });
    const emails = await emailsRes.json();
    const primaryEmail = Array.isArray(emails)
      ? emails.find((e: any) => e.primary)?.email || emails[0]?.email
      : githubUser.email || `${githubUser.login}@users.noreply.github.com`;

    const { token } = await AuthService.githubLoginOrRegister({
      githubId: String(githubUser.id),
      name: githubUser.name || githubUser.login,
      email: primaryEmail,
      username: githubUser.login,
      avatar: githubUser.avatar_url,
    });

    const frontendBase = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    const redirectUrl = new URL("/", frontendBase);
    redirectUrl.searchParams.set("auth", "success");
    redirectUrl.searchParams.set("token", token);

    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "none",
      secure: true,
    });
    return res;
  } catch (err: any) {
    const frontendBase = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(err.message)}`, frontendBase));
  }
}

