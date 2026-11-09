import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { SnippetModel } from "@/backend/models/Snippet";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const snippet = await SnippetModel.findById(id).select("questions");
  if (!snippet) return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, data: snippet.questions });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const snippet = await SnippetModel.findById(id);
  if (!snippet) return NextResponse.json({ success: false }, { status: 404 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ success: false, message: "Content required" }, { status: 400 });

  const question = {
    author: user.name, authorId: user.id,
    content: content.trim(), createdAt: new Date(), answers: [],
  };
  snippet.questions.push(question);
  await snippet.save();

  return NextResponse.json({ success: true, data: snippet.questions[snippet.questions.length - 1] }, { status: 201 });
}
