import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { BlogModel } from "@/backend/models/Blog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const blog = await BlogModel.findById(id).select("comments");
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, data: blog.comments || [] });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const blog = await BlogModel.findById(id);
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });

  const body = await req.json();

  // If action is liking a comment
  if (body.action === "like_comment") {
    const c = (blog.comments as any).id(body.commentId);
    if (!c) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });
    const idx = (c.likes || []).indexOf(user.id);
    if (idx === -1) c.likes = [...(c.likes || []), user.id];
    else c.likes.splice(idx, 1);
    await blog.save();
    return NextResponse.json({ success: true, data: c });
  }

  // If action is replying to a comment
  if (body.action === "reply_comment") {
    const c = (blog.comments as any).id(body.commentId);
    if (!c) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });
    if (!body.content?.trim()) return NextResponse.json({ success: false, message: "Reply content required" }, { status: 400 });
    c.replies.push({
      author: user.name, authorId: user.id, content: body.content.trim(), likes: [], createdAt: new Date(),
    });
    await blog.save();
    return NextResponse.json({ success: true, data: c.replies[c.replies.length - 1] });
  }

  // If action is liking a reply
  if (body.action === "like_reply") {
    const c = (blog.comments as any).id(body.commentId);
    if (!c) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });
    const r = (c.replies as any).id(body.replyId);
    if (!r) return NextResponse.json({ success: false, message: "Reply not found" }, { status: 404 });
    const idx = (r.likes || []).indexOf(user.id);
    if (idx === -1) r.likes = [...(r.likes || []), user.id];
    else r.likes.splice(idx, 1);
    await blog.save();
    return NextResponse.json({ success: true, data: r });
  }

  // Otherwise standard comment
  if (!body.content?.trim()) return NextResponse.json({ success: false, message: "Content required" }, { status: 400 });
  const comment = {
    author: user.name, authorId: user.id, content: body.content.trim(), likes: [], replies: [], createdAt: new Date(),
  };
  blog.comments.push(comment as any);
  await blog.save();

  return NextResponse.json({ success: true, data: blog.comments[blog.comments.length - 1] }, { status: 201 });
}
