import axios from "@/lib/api/axios";

export function buildUrl(
  pageNum: number = 0,
  limit: number,
  sortBy?: string,
  filters?: string,
  search?: string,
): string {
  let url = `/posts?page=${pageNum}&size=${limit}`;
  if (search) {
    url = `/search?page=${pageNum}&size=${limit}`;
  }

  if (sortBy) {
    url += `&sortby=${sortBy}`;
  } else {
    url += `&sortby=latest`;
  }
  if (filters) url += `&filter=${filters}`;
  if (search) url += `&search=${search}`;
  return url;
}

export async function getTravelCard(
  pageNum: number = 0,
  limit: number,
  sortBy?: string,
  filters?: string,
  search?: string,
): Promise<any> {
  try {
    const url = buildUrl(pageNum, limit, sortBy, filters, search);
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
