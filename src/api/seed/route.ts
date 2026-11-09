import { NextResponse } from "next/server";
import { connectToDatabase } from "@/backend/config/db";
import { SnippetModel } from "@/backend/models/Snippet";
import { BlogModel } from "@/backend/models/Blog";
import { CommunityModel } from "@/backend/models/Community";
import { initialSnippets } from "@/backend/data/seedData";
import { initialBlogs } from "@/backend/data/initialBlogs";
import { initialCommunities } from "@/backend/data/initialCommunities";

export async function POST() {
  try {
    await connectToDatabase();
    await SnippetModel.deleteMany({});
    await BlogModel.deleteMany({});
    await CommunityModel.deleteMany({});

    await SnippetModel.insertMany(initialSnippets);
    await BlogModel.insertMany(initialBlogs);
    await CommunityModel.insertMany(initialCommunities);

    return NextResponse.json({
      success: true,
      message: "Seeded real data to MongoDB Atlas successfully!",
      snippets: initialSnippets.length,
      blogs: initialBlogs.length,
      communities: initialCommunities.length,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}

