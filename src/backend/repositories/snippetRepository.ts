import { connectToDatabase } from "@/backend/config/db";
import { SnippetModel } from "@/backend/models/Snippet";
import { initialSnippets } from "@/backend/data/seedData";
import { SnippetItem } from "@/frontend/types/snippet";

export class SnippetRepository {
  private static inMemorySnippets: SnippetItem[] = [...initialSnippets];

  static async getAll(): Promise<SnippetItem[]> {
    const conn = await connectToDatabase().catch(() => null);
    if (!conn) return this.inMemorySnippets;
    try {
      const docs = await SnippetModel.find().sort({ createdAt: -1 }).lean();
      if (!docs?.length) return this.inMemorySnippets;
      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        category: doc.category,
        technology: doc.technology,
        level: doc.level,
        tags: doc.tags || [],
        files: doc.files || [],
        author: doc.author || "Rana Sheikh",
        authorId: doc.authorId,
        isPublic: doc.isPublic ?? true,
        copyCount: doc.copyCount || 0,
        starsCount: doc.starsCount || 0,
        createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      }));
    } catch {
      return this.inMemorySnippets;
    }
  }

  static async create(item: Omit<SnippetItem, "id" | "copyCount" | "starsCount" | "createdAt">): Promise<SnippetItem> {
    const conn = await connectToDatabase().catch(() => null);
    const newSnippet: SnippetItem = {
      ...item, id: "snip-" + Date.now(), copyCount: 0, starsCount: 0, createdAt: new Date().toISOString(),
    };
    if (!conn) {
      this.inMemorySnippets.unshift(newSnippet);
      return newSnippet;
    }
    try {
      const created = await SnippetModel.create({ ...item, copyCount: 0, starsCount: 0 });
      return { ...newSnippet, id: created._id.toString() };
    } catch {
      this.inMemorySnippets.unshift(newSnippet);
      return newSnippet;
    }
  }

  static async incrementCopy(id: string): Promise<void> {
    const mem = this.inMemorySnippets.find((s) => s.id === id);
    if (mem) mem.copyCount += 1;
    const conn = await connectToDatabase().catch(() => null);
    if (conn) await SnippetModel.findByIdAndUpdate(id, { $inc: { copyCount: 1 } }).catch(() => null);
  }

  static async incrementStar(id: string): Promise<number> {
    const mem = this.inMemorySnippets.find((s) => s.id === id);
    if (mem) mem.starsCount = (mem.starsCount || 0) + 1;
    const conn = await connectToDatabase().catch(() => null);
    if (conn) {
      const res = await SnippetModel.findByIdAndUpdate(id, { $inc: { starsCount: 1 } }, { new: true }).catch(() => null);
      if (res) return res.starsCount;
    }
    return mem?.starsCount || 1;
  }

  static async fork(id: string, authorName: string): Promise<SnippetItem | null> {
    const all = await this.getAll();
    const source = all.find((s) => s.id === id);
    if (!source) return null;
    return this.create({
      title: `${source.title} (Forked)`,
      description: `Forked from ${source.author}: ${source.description}`,
      category: source.category,
      technology: source.technology,
      level: source.level,
      tags: [...source.tags, "forked"],
      files: source.files.map((f) => ({ ...f })),
      author: authorName,
      isPublic: true,
    });
  }
}
