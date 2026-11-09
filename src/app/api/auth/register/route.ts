import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const result = await AuthService.register(name, email, password);
    const response = NextResponse.json({ success: true, ...result });
    response.cookies.set("token", result.token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "none",
      secure: true,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Registration failed" }, { status: 400 });
  }
}

