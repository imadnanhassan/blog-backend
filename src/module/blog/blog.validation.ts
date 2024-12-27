import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const deleteBlogSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Blog ID is required'),
  }),
});

export const getAllBlogsSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  author: z.string().optional(),
});
