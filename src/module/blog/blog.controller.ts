import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { BlogServices } from './blog.service';
// import { BlogValidation } from './blog.validation';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

//create blog
const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const blogData = {
    title,
    content,
    author: new Types.ObjectId(req.user?.id),
  };
  const result = await BlogServices.createBlogInDB(blogData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: result,
  });
});
//get all blogs
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const search = req.query.search as string | undefined;
  const sortBy = (req.query.sortBy as string | undefined) || 'createdAt'; // Default field: createdAt
  const sortOrder = req.query.sortOrder as string | undefined;
  const filterParam = req.query.filter as string | undefined; // Interpret as author ID

  // Construct filter for search and filter (author ID)
  const filter: Record<string, unknown> = {
    ...(search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
          ],
        }
      : {}),
    ...(filterParam ? { author: filterParam } : {}), // Add author filter if provided
  };

  // Determine sort direction
  const sortDirection = sortOrder === 'desc' ? -1 : 1; // Default to ascending (1)

  // Construct sort object
  const sort: Record<string, 1 | -1> =
    sortBy && typeof sortBy === 'string' ? { [sortBy]: sortDirection } : {};

  // Retrieve blogs using dynamic filter and sort
  const result = await BlogServices.getAllBlogsFromDB(filter, sort);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});
//update blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Delegate the database update to the service layer
  const updatedBlog = await BlogServices.updateBlogInDB({
    id,
    title,
    content,
    userId: req.user?.id,
  });

  if (!updatedBlog) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Blog not found or unauthorized',
      data: {},
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});
// delete user own blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const isDeleted = await BlogServices.deleteBlogFromDB({
    id,
    userId: req.user?.id,
  });

  if (!isDeleted) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Blog not found or unauthorized',
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: {},
  });
});

// Cdelete any blog by admin
const deleteAnyBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const isDeleted = await BlogServices.deleteAnyBlogFromDB(id);

  if (!isDeleted) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Blog not found',
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  deleteAnyBlog,
};
