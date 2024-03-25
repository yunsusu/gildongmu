import axios from "@/lib/api/axios";

export const getDetail = async (postid: Number) => {
  const res = await axios.get(`/post/${postid}`);
  return res.data;
};

export const deleteDetail = async (postid: Number) => {
  const res = await axios.delete(`/post/${postid}`);
  return res.data;
};
