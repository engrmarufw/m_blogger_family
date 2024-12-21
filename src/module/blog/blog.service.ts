import { BlogModel } from './blog.model';
import { Blog } from './blog.interface';

// Create blog
const createBlogInDB = async (payload: Partial<Blog>): Promise<Blog> => {
  return await BlogModel.create(payload);
};

// Get all blogs
const getAllBlogsFromDB = async (
  filter: Record<string, unknown> = {},
  sort: Record<string, 1 | -1> = {},
) => {
  return BlogModel.find(filter).sort(sort);
};

// Update blog
const updateBlogInDB = async (
  payload: Partial<Blog> & { id: string; userId: string },
): Promise<Blog | null> => {
  const { id, title, content, userId } = payload;
  const blog = await BlogModel.findById(id);

  if (!blog || blog.author.toString() !== userId) {
    return null;
  }

  return await BlogModel.findByIdAndUpdate(
    id,
    { title, content },
    { new: true, runValidators: true },
  ).populate('author', 'name email');
};

// Delete blog (owner)
const deleteBlogFromDB = async (payload: {
  id: string;
  userId: string;
}): Promise<boolean> => {
  const { id, userId } = payload;
  const blog = await BlogModel.findById(id);

  if (!blog || blog.author.toString() !== userId) {
    return false;
  }

  await BlogModel.findByIdAndDelete(id);
  return true;
};

// Delete any blog (admin)
const deleteAnyBlogFromDB = async (id: string): Promise<boolean> => {
  const deletedBlog = await BlogModel.findByIdAndDelete(id);
  return !!deletedBlog;
};

export const BlogServices = {
  createBlogInDB,
  getAllBlogsFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
  deleteAnyBlogFromDB,
};
