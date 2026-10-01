import { z } from 'zod';

/**
 * Database Protection - Pagination Validation
 * 
 * Prevents:
 * - Requesting too many records at once
 * - Database overload from expensive queries
 * - Memory exhaustion
 */

// Maximum items per page (hard limit)
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_PAGE_SIZE = 20;

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

/**
 * Parse and validate pagination parameters from URL search params
 */
export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  const params = {
    page: searchParams.get('page') || '1',
    pageSize: searchParams.get('pageSize') || searchParams.get('limit') || String(DEFAULT_PAGE_SIZE),
    sortBy: searchParams.get('sortBy') || searchParams.get('orderBy') || undefined,
    sortOrder: searchParams.get('sortOrder') || searchParams.get('order') || 'desc',
  };

  const validated = paginationSchema.parse(params);

  // Log warning if requesting max page size
  if (validated.pageSize >= MAX_PAGE_SIZE) {
    console.warn(`⚠️  Maximum page size requested: ${validated.pageSize}`);
  }

  return validated;
}

/**
 * Calculate Prisma skip and take from page params
 */
export function getPaginationQuery(params: PaginationParams) {
  const skip = (params.page - 1) * params.pageSize;
  const take = params.pageSize;

  return { skip, take };
}

/**
 * Create pagination metadata for response
 */
export function createPaginationMeta(
  params: PaginationParams,
  totalItems: number
) {
  const totalPages = Math.ceil(totalItems / params.pageSize);
  const hasNext = params.page < totalPages;
  const hasPrev = params.page > 1;

  return {
    page: params.page,
    pageSize: params.pageSize,
    totalItems,
    totalPages,
    hasNext,
    hasPrev,
  };
}

/**
 * Enforce pagination on Prisma query
 * 
 * Usage:
 *   const data = await prisma.course.findMany(
 *     enforcePagination(params, { where: { isActive: true }})
 *   );
 */
export function enforcePagination<T extends Record<string, any>>(
  params: PaginationParams,
  queryOptions: T
): T {
  const { skip, take } = getPaginationQuery(params);

  return {
    ...queryOptions,
    skip,
    take,
  };
}

/**
 * Validate and enforce max items for findMany queries
 * 
 * Prevents: prisma.xxx.findMany() without limit
 */
export function enforceMaxItems<T extends { take?: number }>(
  query: T,
  maxItems: number = MAX_PAGE_SIZE
): T {
  if (!query.take || query.take > maxItems) {
    console.warn(`⚠️  Query without proper limit, enforcing max: ${maxItems}`);
    return { ...query, take: maxItems };
  }
  return query;
}
