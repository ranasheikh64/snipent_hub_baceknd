import { connectToDatabase } from "@/backend/config/db";
import { BlogModel } from "@/backend/models/Blog";
import { initialBlogs } from "@/backend/data/initialBlogs";
import { BlogPost } from "@/frontend/types/blog";

export class BlogRepository {
  private static inMemoryBlogs: BlogPost[] = initialBlogs.map((b: any) => ({
    ...b,
    likes: [],
    comments: [],
  }));

  static async getAll(): Promise<BlogPost[]> {
    const conn = await connectToDatabase().catch(() => null);
    if (!conn) return this.inMemoryBlogs;

    try {
      const docs = await BlogModel.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
      if (!docs || docs.length === 0) return this.inMemoryBlogs;

      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        content: doc.content,
        excerpt: doc.excerpt || "",
        category: doc.category || "General",
        tags: doc.tags || [],
        author: doc.author || "Rana Sheikh",
        authorId: doc.authorId,
        readTime: doc.readTime || "5 min read",
        isPublished: doc.isPublished ?? true,
        likes: doc.likes || [],
        comments: (doc.comments || []).map((c: any) => ({
          _id: c._id ? c._id.toString() : "",
          author: c.author,
          authorId: c.authorId,
          content: c.content,
          likes: c.likes || [],
          replies: (c.replies || []).map((r: any) => ({
            _id: r._id ? r._id.toString() : "",
            author: r.author,
            authorId: r.authorId,
            content: r.content,
            likes: r.likes || [],
            createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
          })),
          createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : new Date().toISOString(),
        })),
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      }));
    } catch {
      return this.inMemoryBlogs;
    }
  }

  static async getBySlug(slug: string): Promise<BlogPost | null> {
    const all = await this.getAll();
    return all.find((b) => b.slug === slug) || null;
  }
}
