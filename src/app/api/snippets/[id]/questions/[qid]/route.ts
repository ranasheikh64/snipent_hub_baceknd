import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { SnippetModel } from "@/backend/models/Snippet";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; qid: string }> }
) {
  const { id, qid } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const snippet = await SnippetModel.findById(id);
  if (!snippet) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  const question = snippet.questions.find((q: any) => q._id.toString() === qid);
  if (!question) return NextResponse.json({ success: false, message: "Question not found" }, { status: 404 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ success: false, message: "Content required" }, { status: 400 });

  question.answers.push({
    author: user.name,
    authorId: user.id,
    content: content.trim(),
    createdAt: new Date(),
  });
  // Mark question as read when answered
  question.isRead = true;
  await snippet.save();

  return NextResponse.json({
    success: true,
    data: question.answers[question.answers.length - 1],
  }, { status: 201 });
}
