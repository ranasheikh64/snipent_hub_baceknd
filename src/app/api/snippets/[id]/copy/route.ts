import { NextRequest, NextResponse } from "next/server";
import { SnippetService } from "@/backend/services/snippetService";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await SnippetService.copySnippet(id);
    return NextResponse.json({ success: true, message: "Copy count updated" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to update copy count" },
      { status: 500 }
    );
  }
}

