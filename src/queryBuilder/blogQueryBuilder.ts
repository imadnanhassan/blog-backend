import { FilterQuery } from 'mongoose';
import BlogModel from '../module/blog/blog.model';

interface QueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  author?: string;
}

export const buildBlogQuery = (
  params: QueryParams
): FilterQuery<typeof BlogModel> => {
  const query: FilterQuery<typeof BlogModel> = {};

  if (params.search) {
    query.$or = [
      { title: { $regex: params.search, $options: 'i' } },
      { content: { $regex: params.search, $options: 'i' } },
    ];
  }

  if (params.author) {
    query.author = params.author;
  }

  return query;
};
export const buildBlogSort = (
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
) => {
  const sort: Record<string, 1 | -1> = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  return sort;
};
