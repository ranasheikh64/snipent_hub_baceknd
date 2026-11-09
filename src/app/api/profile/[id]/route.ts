import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/authService";
import connectDB from "@/backend/config/db";
import { UserModel } from "@/backend/models/User";
import { SnippetModel } from "@/backend/models/Snippet";
import { BlogModel } from "@/backend/models/Blog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const user = await UserModel.findById(id).select("-passwordHash");
  if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

  const [snippets, blogs] = await Promise.all([
    SnippetModel.find({ authorId: id }).sort({ createdAt: -1 }).limit(20),
    BlogModel.find({ authorId: id }).sort({ createdAt: -1 }).limit(10),
  ]);

  return NextResponse.json({ success: true, data: { user, snippets, blogs } });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  const me = token ? AuthService.verifyToken(token) : null;
  if (!me || me.id !== id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  const allowed = { name: body.name, bio: body.bio };
  const user = await UserModel.findByIdAndUpdate(id, allowed, { new: true }).select("-passwordHash");
  return NextResponse.json({ success: true, data: user });
}
