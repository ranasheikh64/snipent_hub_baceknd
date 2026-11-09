import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { SnippetModel } from "@/backend/models/Snippet";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, data: [] });

  try {
    await connectDB();
    const snippets = await SnippetModel.find({
      $or: [{ authorId: user.id }, { author: user.name }],
      "questions.0": { $exists: true },
    }).select("_id title questions").lean();

    const notifications: Array<{
      snippetId: string;
      snippetTitle: string;
      questionId: string;
      questionAuthor: string;
      questionContent: string;
      createdAt: string;
      isRead: boolean;
      answersCount: number;
    }> = [];

    snippets.forEach((s: any) => {
      (s.questions || []).forEach((q: any) => {
        const answersCount = (q.answers || []).length;
        // If question already has answers, it is considered answered/read
        const isRead = Boolean(q.isRead) || answersCount > 0;
        notifications.push({
          snippetId: s._id.toString(),
          snippetTitle: s.title,
          questionId: q._id.toString(),
          questionAuthor: q.author,
          questionContent: q.content,
          createdAt: q.createdAt ? new Date(q.createdAt).toISOString() : new Date().toISOString(),
          isRead,
          answersCount,
        });
      });
    });

    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: notifications });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { snippetId, questionId } = await req.json();
    await connectDB();
    const snippet = await SnippetModel.findById(snippetId);
    if (!snippet) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

    const q = snippet.questions.find((item: any) => item._id.toString() === questionId);
    if (q) {
      q.isRead = true;
      await snippet.save();
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
