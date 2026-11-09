import { BlogRepository } from "@/backend/repositories/blogRepository";
import { BlogPost } from "@/frontend/types/blog";

export class BlogService {
  static async getAllBlogs(): Promise<BlogPost[]> {
    return BlogRepository.getAll();
  }

  static async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    return BlogRepository.getBySlug(slug);
  }
}

