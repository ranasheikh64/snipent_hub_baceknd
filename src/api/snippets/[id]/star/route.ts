import { NextRequest, NextResponse } from "next/server";
import { SnippetService } from "@/backend/services/snippetService";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const starsCount = await SnippetService.starSnippet(id);
    return NextResponse.json({ success: true, starsCount });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

