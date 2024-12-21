import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create blog
router.post('/blogs', auth('user'), BlogControllers.createBlog);

// Get all blogs
router.get('/blogs', BlogControllers.getAllBlogs);

// Update blog
router.patch('/blogs/:id', auth('user'), BlogControllers.updateBlog);

// Delete blog (owner)
router.delete('/blogs/:id', auth('user'), BlogControllers.deleteBlog);

// Delete blog (admin)
router.delete('/:id', auth('admin'), BlogControllers.deleteAnyBlog);

export const blogRoutes = router;
