import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/backend/services/blogService";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";

export async function GET() {
  try {
    const blogs = await BlogService.getAllBlogs();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user = token ? AuthService.verifyToken(token) : null;
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, message: "Title and content required" }, { status: 400 });
    }
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const wordCount = body.content.split(" ").length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    const { BlogModel } = await import("@/backend/models/Blog");
    const blog = await BlogModel.create({
      ...body, slug, author: user.name, authorId: user.id, readTime, isPublished: true,
    });
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}
