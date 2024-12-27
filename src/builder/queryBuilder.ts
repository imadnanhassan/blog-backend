import { Request } from 'express';

interface QueryParams {
  search: string;
  sortBy: string;
  sortOrder: string;
  filter: string;
}

export const buildQuery = (
  query: Request['query']
): { conditions: any; sort: any } => {
  let searchFilter = {};
  let sortFilter = {};
  let authorFilter = {};

  if (query.search) {
    const searchRegex = new RegExp(query.search as string, 'i');
    searchFilter = {
      $or: [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ],
    };
  }

  // Sort: Sort blogs by specific fields
  if (query.sortBy) {
    const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    sortFilter = { [query.sortBy as string]: sortOrder };
  }

  // Filter: Filter blogs by author ID
  if (query.filter) {
    authorFilter = { author: query.filter };
  }

  // Combine all filters
  const queryConditions = { ...searchFilter, ...authorFilter };

  return {
    conditions: queryConditions,
    sort: Object.keys(sortFilter).length ? sortFilter : undefined,
  };
};
