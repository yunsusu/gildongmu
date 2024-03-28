import axios from "@/lib/api/axios";

export const postBookMarks = async (postid: Number) => {
  const res = await axios.post(`/posts/${postid}/bookmarks`);
  return res.data;
};

export const deleteBookMarks = async (postid: Number) => {
  const res = await axios.delete(`/posts/${postid}/bookmarks`);
  return res.data;
};
