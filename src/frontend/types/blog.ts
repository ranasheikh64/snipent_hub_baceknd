export interface CommentReply {
  _id: string;
  author: string;
  authorId: string;
  content: string;
  likes: string[];
  createdAt: string;
}

export interface BlogComment {
  _id: string;
  author: string;
  authorId: string;
  content: string;
  likes: string[];
  replies: CommentReply[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorId?: string;
  readTime: string;
  isPublished: boolean;
  likes: string[];
  comments: BlogComment[];
  createdAt: string;
}
