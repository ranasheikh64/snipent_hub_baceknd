import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 });
    }
    const result = await AuthService.login(email, password);
    const response = NextResponse.json({ success: true, ...result });
    response.cookies.set("token", result.token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 30 });
    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Login failed" }, { status: 401 });
  }
}

