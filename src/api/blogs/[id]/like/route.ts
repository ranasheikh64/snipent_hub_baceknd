import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { BlogModel } from "@/backend/models/Blog";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const blog = await BlogModel.findById(id);
  if (!blog) return NextResponse.json({ success: false }, { status: 404 });

  const idx = blog.likes.indexOf(user.id);
  if (idx === -1) blog.likes.push(user.id);
  else blog.likes.splice(idx, 1);
  await blog.save();

  return NextResponse.json({ success: true, liked: idx === -1, likesCount: blog.likes.length });
}
