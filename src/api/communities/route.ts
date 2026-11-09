import { NextRequest, NextResponse } from "next/server";
import { CommunityService } from "@/backend/services/communityService";

export async function GET() {
  try {
    const list = await CommunityService.getAllCommunities();
    return NextResponse.json({ success: true, data: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, message: "Community name is required" }, { status: 400 });
    }
    const created = await CommunityService.createCommunity(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

