import axios from "@/lib/api/axios";

export const putWrite = async (postid: Number) => {
  const res = await axios.put(`/post/${postid}`);
  return res.data;
};
