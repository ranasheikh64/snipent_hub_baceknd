import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommentReply {
  _id?: string;
  author: string;
  authorId: string;
  content: string;
  likes: string[];
  createdAt: Date;
}

export interface IBlogComment {
  _id?: string;
  author: string;
  authorId: string;
  content: string;
  likes: string[];
  replies: ICommentReply[];
  createdAt: Date;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  authorId?: string;
  readTime: string;
  isPublished: boolean;
  likes: string[];
  comments: IBlogComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentReplySchema = new Schema<ICommentReply>({
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const BlogCommentSchema = new Schema<IBlogComment>({
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: String }],
  replies: [CommentReplySchema],
  createdAt: { type: Date, default: Date.now },
});

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "" },
    coverImage: { type: String },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    author: { type: String, default: "Rana Sheikh" },
    authorId: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
    isPublished: { type: Boolean, default: true },
    likes: [{ type: String }],
    comments: [BlogCommentSchema],
  },
  { timestamps: true }
);

export const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
