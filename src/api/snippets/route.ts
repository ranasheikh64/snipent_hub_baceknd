import { NextRequest, NextResponse } from "next/server";
import { SnippetService } from "@/backend/services/snippetService";
import { AuthService } from "@/backend/services/authService";
import { TopicFilter } from "@/frontend/types/snippet";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const topic = (searchParams.get("topic") || "ALL").toUpperCase() as TopicFilter;
  const level = searchParams.get("level") || undefined;
  const search = searchParams.get("q") || undefined;

  const token = request.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;

  try {
    const snippets = await SnippetService.getFilteredSnippets(topic, level, search, user?.email);
    return NextResponse.json({ success: true, data: snippets });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.technology || !body.files?.length) {
      return NextResponse.json(
        { success: false, message: "Title, category, technology, and files are required." },
        { status: 400 }
      );
    }

    const token = request.cookies.get("token")?.value;
    const user = token ? AuthService.verifyToken(token) : null;

    const created = await SnippetService.createSnippet({
      ...body,
      author: user?.name || body.author || "Rana Sheikh",
      authorId: user?.id,
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create snippet" },
      { status: 500 }
    );
  }
}
