import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISnippetFile {
  filename: string;
  language: string;
  code: string;
  purpose?: string;
}

export interface ISnippetAnswer {
  author: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface ISnippetQuestion {
  _id?: string;
  author: string;
  authorId: string;
  content: string;
  createdAt: Date;
  isRead?: boolean;
  answers: ISnippetAnswer[];
}

export interface ISnippet extends Document {
  title: string;
  description: string;
  category: string;
  technology: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  files: ISnippetFile[];
  author: string;
  authorId?: string;
  isPublic: boolean;
  copyCount: number;
  starsCount: number;
  questions: ISnippetQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const SnippetFileSchema = new Schema<ISnippetFile>({
  filename: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  purpose: { type: String, default: "" },
});

const AnswerSchema = new Schema<ISnippetAnswer>({
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const QuestionSchema = new Schema<ISnippetQuestion>({
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  answers: [AnswerSchema],
});

const SnippetSchema = new Schema<ISnippet>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    technology: { type: String, required: true, index: true },
    level: { type: String, enum: ["Beginner","Intermediate","Advanced"], default: "Beginner" },
    tags: [{ type: String, trim: true }],
    files: [SnippetFileSchema],
    author: { type: String, default: "Rana Sheikh" },
    authorId: { type: String, default: "" },
    isPublic: { type: Boolean, default: true },
    copyCount: { type: Number, default: 0 },
    starsCount: { type: Number, default: 0 },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export const SnippetModel: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", SnippetSchema);
