import axios from "@/lib/api/axios";

export async function getChat() {
  try {
    const res = await axios.get(`/chat`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
