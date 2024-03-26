import axios from "@/lib/api/axios";

export function buildUrl(
  pageNum: number = 0,
  limit: number,
  sortBy?: string,
  filters?: string,
): string {
  let url = `/posts?page=${pageNum}&size=${limit}`;
  if (sortBy) url += `&sort=${sortBy}`;
  if (filters) url += `&filter=${filters}`;
  return url;
}

export async function getTravelCard(
  pageNum: number = 0,
  limit: number,
  sortBy?: string,
  filters?: string,
): Promise<any> {
  try {
    const url = buildUrl(pageNum, limit, sortBy, filters);
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
