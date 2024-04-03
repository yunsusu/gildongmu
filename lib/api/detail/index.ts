import axios from "@/lib/api/axios";

export const getDetail = async (postid: Number) => {
  const res = await axios.get(`/posts/${postid}`);
  return res.data;
};

export const deleteDetail = async (postid: Number) => {
  const res = await axios.delete(`/posts/${postid}`);
  return res.data;
};

export const postComment = async (
  postid: number,
  commentText: string,
  commentSecret: boolean,
) => {
  const res = await axios.post(`/posts/${postid}/comments`, {
    content: commentText,
    secret: commentSecret,
  });
  return res.data;
};

export const editComment = async (
  postid: number,
  commentText: string,
  commentSecret: boolean,
  commentId: number,
) => {
  const res = await axios.put(`/posts/${postid}/comments/${commentId}`, {
    content: commentText,
    secret: commentSecret,
  });
  return res.data;
};

export const postCommentOfComment = async (
  postid: number,
  commentText: string,
  commentSecret: boolean,
  commentParentId: number,
) => {
  const res = await axios.post(`/posts/${postid}/comments`, {
    content: commentText,
    secret: commentSecret,
    parentId: commentParentId,
  });
  return res.data;
};

export const deleteComment = async (postid: number, commentId: number) => {
  const res = await axios.delete(`/posts/${postid}/comments/${commentId}`);
  return res.data;
};

export const getCommentList = async (postid: Number) => {
  const res = await axios.get(`/posts/${postid}/comments`);
  return res;
};

export const postParticipants = async (postid: number) => {
  const res = await axios.post(`/posts/${postid}/participants`, {});
  return res.data;
};

export const deleteParticipants = async (postid: number) => {
  const res = await axios.delete(`/posts/${postid}/participants`);
  return res.data;
};

