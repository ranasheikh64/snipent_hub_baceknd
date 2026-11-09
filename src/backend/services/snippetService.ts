import { SnippetRepository } from "@/backend/repositories/snippetRepository";
import { CommunityModel } from "@/backend/models/Community";
import { connectToDatabase } from "@/backend/config/db";
import { SnippetItem, TopicFilter } from "@/frontend/types/snippet";

export class SnippetService {
  static async getFilteredSnippets(
    topic: TopicFilter = "ALL",
    level?: string,
    search?: string,
    userEmail?: string
  ): Promise<SnippetItem[]> {
    const all = await SnippetRepository.getAll();

    let joinedTags: string[] = [];
    if (userEmail) {
      await connectToDatabase().catch(() => null);
      const joined = await CommunityModel.find({ members: userEmail }).lean().catch(() => []);
      joinedTags = joined.map((c: any) => c.hashtag || `#${c.slug}`);
    }

    const filtered = all.filter((s) => {
      const sTech = (s.technology || "").toUpperCase();
      const sCat = (s.category || "").toUpperCase();
      const sTags = (s.tags || []).map((t) => t.toUpperCase());

      let matchTopic = true;
      if (topic === "ALL") {
        matchTopic = true;
      } else if (topic === "FAVORITES") {
        matchTopic = (s.starsCount || 0) > 0;
      } else if (topic === "FLUTTER") {
        matchTopic = sTech === "FLUTTER" || sTags.includes("FLUTTER");
      } else if (topic === "BACKEND") {
        matchTopic = sTech === "BACKEND" || sTech === "NODE.JS" || sTech === "PYTHON" || sTech === "GO" || sCat.includes("BACKEND") || sTags.includes("BACKEND") || sTags.includes("NODE.JS");
      } else if (topic === "REACT") {
        matchTopic = sTech === "REACT" || sTech === "NEXT.JS" || sTags.includes("REACT") || sTags.includes("NEXT.JS");
      } else if (topic === "FULLSTACK") {
        matchTopic = sTech === "FULLSTACK" || sCat.includes("FULLSTACK") || sTags.includes("FULLSTACK");
      } else {
        matchTopic = sTech === topic || sCat.includes(topic) || sTags.includes(topic);
      }

      const matchLevel = !level || (s.level || "BEGINNER").toUpperCase() === level.toUpperCase();

      const q = search?.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.technology.toLowerCase().includes(q) ||
        s.files.some((f) => f.filename.toLowerCase().includes(q) || f.code.toLowerCase().includes(q));

      return matchTopic && matchLevel && matchSearch;
    });

    if (joinedTags.length > 0) {
      filtered.sort((a, b) => {
        const aBoost = a.tags.some((t) => joinedTags.includes(t)) ? 1 : 0;
        const bBoost = b.tags.some((t) => joinedTags.includes(t)) ? 1 : 0;
        return bBoost - aBoost;
      });
    }

    return filtered;
  }

  static async createSnippet(data: {
    title: string;
    description: string;
    category: string;
    technology: string;
    level?: "Beginner" | "Intermediate" | "Advanced";
    tags: string[];
    files: { filename: string; language: string; code: string; purpose?: string }[];
    author?: string;
    authorId?: string;
    isPublic?: boolean;
  }): Promise<SnippetItem> {
    return SnippetRepository.create({
      title: data.title,
      description: data.description,
      category: data.category,
      technology: data.technology,
      level: data.level || "Beginner",
      tags: data.tags,
      files: data.files,
      author: data.author || "Rana Sheikh",
      authorId: data.authorId,
      isPublic: data.isPublic ?? true,
    });
  }

  static async copySnippet(id: string): Promise<void> {
    await SnippetRepository.incrementCopy(id);
  }

  static async starSnippet(id: string): Promise<number> {
    return SnippetRepository.incrementStar(id);
  }

  static async forkSnippet(id: string, authorName: string): Promise<SnippetItem | null> {
    return SnippetRepository.fork(id, authorName);
  }
}
