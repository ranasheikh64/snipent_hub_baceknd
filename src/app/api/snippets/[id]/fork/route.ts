import { NextRequest, NextResponse } from "next/server";
import { SnippetService } from "@/backend/services/snippetService";
import { AuthService } from "@/backend/services/authService";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.cookies.get("token")?.value;
    const user = token ? AuthService.verifyToken(token) : null;
    const authorName = user?.name || "Anonymous Developer";

    const forked = await SnippetService.forkSnippet(id, authorName);
    if (!forked) {
      return NextResponse.json({ success: false, message: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: forked });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

