import { CommunityRepository } from "@/backend/repositories/communityRepository";
import { CommunityItem } from "@/backend/data/initialCommunities";

export class CommunityService {
  static async getAllCommunities(): Promise<CommunityItem[]> {
    return CommunityRepository.getAll();
  }

  static async createCommunity(data: {
    name: string;
    description: string;
    icon?: string;
    creatorName?: string;
  }): Promise<CommunityItem> {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const hashtag = `#${slug}`;
    return CommunityRepository.create({
      name: data.name,
      slug,
      hashtag,
      description: data.description,
      icon: data.icon || "🚀",
      creatorName: data.creatorName || "Rana Sheikh",
    });
  }

  static async toggleJoin(id: string, userEmail: string) {
    return CommunityRepository.toggleJoin(id, userEmail);
  }
}
