import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ success: false, user: null });
  }

  const payload = AuthService.verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, user: null });
  }

  return NextResponse.json({ success: true, user: payload });
}

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("token");
  return response;
}

