import api from "./api";
export const getAllPosts = () =>
  api.get("/posts/admin/all"); 

export const getPostById = (id) =>
  api.get(`/posts/${id}`);

export const approvePost = (id) =>
  api.patch(`/posts/${id}/approve`);

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);

// LIKE / UNLIKE
export const toggleLike = (postId) =>
  api.post(`/posts/${postId}/like`);

// SAVE / UNSAVE
export const toggleSave = (postId) =>
  api.post(`/posts/${postId}/save`);

// COMMENT
export const addComment = (postId, data) =>
  api.post(`/posts/${postId}/comments`, data); 
