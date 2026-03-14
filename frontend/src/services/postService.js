import api from './api';

export const getPosts = async () => {
  const res = await api.get('/posts');
  return res.data; // expects { success, posts, message? }
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data; // expects { success, message }
};
