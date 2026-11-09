import { connectToDatabase } from "@/backend/config/db";
import { CommunityModel } from "@/backend/models/Community";
import { initialCommunities, CommunityItem } from "@/backend/data/initialCommunities";

export class CommunityRepository {
  private static inMemory: CommunityItem[] = [...initialCommunities];

  static async getAll(): Promise<CommunityItem[]> {
    const conn = await connectToDatabase().catch(() => null);
    if (!conn) return this.inMemory;
    try {
      const docs = await CommunityModel.find().sort({ createdAt: -1 }).lean();
      if (!docs?.length) return this.inMemory;
      return docs.map((d: any) => ({
        id: d._id.toString(),
        name: d.name,
        slug: d.slug,
        hashtag: d.hashtag || `#${d.slug}`,
        description: d.description || "",
        icon: d.icon || "🚀",
        creatorName: d.creatorName || "Rana Sheikh",
        membersCount: d.membersCount || 1,
        members: d.members || [],
        snippetsCount: d.snippetsCount || 0,
      }));
    } catch {
      return this.inMemory;
    }
  }

  static async create(item: Omit<CommunityItem, "id" | "membersCount" | "snippetsCount">): Promise<CommunityItem> {
    const newItem: CommunityItem = { ...item, id: "comm-" + Date.now(), membersCount: 1, members: [], snippetsCount: 0 };
    const conn = await connectToDatabase().catch(() => null);
    if (!conn) { this.inMemory.unshift(newItem); return newItem; }
    try {
      const created = await CommunityModel.create(item);
      return { ...newItem, id: created._id.toString() };
    } catch { this.inMemory.unshift(newItem); return newItem; }
  }

  static async toggleJoin(id: string, userEmail: string): Promise<{ isMember: boolean; membersCount: number }> {
    const mem = this.inMemory.find((c) => c.id === id);
    const conn = await connectToDatabase().catch(() => null);
    if (conn) {
      const doc = await CommunityModel.findById(id);
      if (doc) {
        const already = doc.members.includes(userEmail);
        if (already) {
          doc.members = doc.members.filter((m) => m !== userEmail);
          doc.membersCount = Math.max(0, doc.membersCount - 1);
        } else {
          doc.members.push(userEmail);
          doc.membersCount = (doc.membersCount || 0) + 1;
        }
        await doc.save();
        return { isMember: !already, membersCount: doc.membersCount };
      }
    }
    const already = mem?.members?.includes(userEmail);
    if (mem) {
      mem.membersCount = already ? Math.max(0, mem.membersCount - 1) : mem.membersCount + 1;
    }
    return { isMember: !already, membersCount: mem?.membersCount || 1 };
  }
}
