import { Schema, model } from 'mongoose';
import { Blog } from './blog.interface';

const blogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure explicit use of Schema.Types.ObjectId
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BlogModel = model<Blog>('Blog', blogSchema);
