import axios from "@/lib/api/axios";

export const getDetail = async (postid: Number) => {
  const res = await axios.get(`/posts/${postid}`);
  return res.data;
};

export const deleteDetail = async (postid: Number) => {
  const res = await axios.delete(`/posts/${postid}`);
  return res.data;
};
