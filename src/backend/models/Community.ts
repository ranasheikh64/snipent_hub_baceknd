import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommunity extends Document {
  name: string;
  slug: string;
  hashtag: string;
  description: string;
  icon?: string;
  creatorName: string;
  membersCount: number;
  members: string[];
  snippetsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommunitySchema = new Schema<ICommunity>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    hashtag: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "🚀" },
    creatorName: { type: String, default: "Rana Sheikh" },
    membersCount: { type: Number, default: 1 },
    members: [{ type: String }],
    snippetsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CommunityModel: Model<ICommunity> =
  mongoose.models.Community || mongoose.model<ICommunity>("Community", CommunitySchema);
