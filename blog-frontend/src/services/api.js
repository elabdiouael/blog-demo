import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      // Hna kanjibo token ila kan object json, sinon kanakhdoh direct
      try {
        const parsedUser = JSON.parse(user);
        // Ila kan user object fih token, awla user howa token direct
        const token = parsedUser.token || parsedUser; 
        // Adaptez 3la 7sab chno kayrjja3 backend f login exactly
        // f backend dyalna drna kirejja3 user object, so often no token field explicit unless added
      } catch (e) {
         // Token logic
      }
    }
  }
  return config;
});

// --- AUTH ---
export const login = (credentials) => API.post('/auth/login', credentials);

// --- CATEGORIES (✅ HADI LI KANT KHASSAK) ---
export const getCategories = () => API.get('/categories');

// --- POSTS ---
export const getAllPosts = () => API.get('/posts'); // Smiya s7i7a
export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, postData) => API.put(`/posts/${id}`, postData); // (✅ HADI LI KHASSAK L EDIT)
export const deletePost = (id) => API.delete(`/posts/${id}`);

// --- COMMENTS ---
export const getCommentsByPost = (postId) => API.get(`/comments/post/${postId}`);
export const createComment = (commentData) => API.post('/comments', commentData);
export const deleteComment = (id) => API.delete(`/comments/${id}`);

export default API;