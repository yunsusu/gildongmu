import axios from "@/lib/api/axios";

export const getUserMe = async () => {
  const res = await axios.get(`/users/me`);
  return res.data;
};
