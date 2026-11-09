import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { SnippetModel } from "@/backend/models/Snippet";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const snippet = await SnippetModel.findById(id);
  if (!snippet) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: snippet });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const snippet = await SnippetModel.findById(id);
  if (!snippet) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  if (snippet.authorId && snippet.authorId !== user.id) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  Object.assign(snippet, {
    title: body.title,
    description: body.description,
    technology: body.technology,
    category: body.category,
    files: body.files,
    tags: body.tags || snippet.tags,
    isPublic: body.isPublic !== undefined ? body.isPublic : snippet.isPublic,
  });
  await snippet.save();
  return NextResponse.json({ success: true, data: snippet });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const snippet = await SnippetModel.findById(id);
  if (!snippet) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  if (snippet.authorId && snippet.authorId !== user.id) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  await snippet.deleteOne();
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}
