import { NextRequest, NextResponse } from "next/server";
import { CommunityService } from "@/backend/services/communityService";
import { AuthService } from "@/backend/services/authService";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    const user = token ? AuthService.verifyToken(token) : null;
    let bodyEmail: string | undefined;
    try {
      const body = await req.json();
      bodyEmail = body?.userEmail;
    } catch {
      // no body passed
    }

    const email = user?.email || bodyEmail || "rofikul6424islam@gmail.com";
    const result = await CommunityService.toggleJoin(id, email);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
