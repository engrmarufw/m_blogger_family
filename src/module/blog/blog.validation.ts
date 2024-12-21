import { z } from 'zod';

// Validation schema for creating a blog
const createBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    author: z
      .string({ required_error: 'Author ID is required' })
      .refine((id) => id.length === 24, {
        message: 'Invalid author ID format. Must be a 24-character ObjectId.',
      }),
  }),
});

// Validation schema for retrieving a single blog
const getSingleBlogSchema = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'Blog ID is required' })
      .refine((id) => id.length === 24, {
        message: 'Invalid blog ID format. Must be a 24-character ObjectId.',
      }),
  }),
});

export const BlogValidation = {
  createBlogSchema,
  getSingleBlogSchema,
};
