import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { BlogModel } from "@/backend/models/Blog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const blog = await BlogModel.findById(id);
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });
  return NextResponse.json({ success: true, data: blog });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const blog = await BlogModel.findById(id);
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });
  if (blog.authorId !== user.id) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  const body = await req.json();
  Object.assign(blog, body);
  await blog.save();
  return NextResponse.json({ success: true, data: blog });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const blog = await BlogModel.findById(id);
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });
  if (blog.authorId !== user.id) return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  await blog.deleteOne();
  return NextResponse.json({ success: true });
}
