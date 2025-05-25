import mongoose, { Schema, Document, models } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  createdAt: Date;
  team?: string; // аль багийн мэдээ вэ
}

const NewsSchema: Schema = new Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  team: { type: String },
});

const News = models.News || mongoose.model<INews>('News', NewsSchema);
export default News;
