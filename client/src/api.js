import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

export const getNotes = () => api.get('/notes').then(res => res.data);
export const createNote = data => api.post('/notes', data).then(res => res.data);
export const updateNote = (id, data) => api.put(`/notes/${id}`, data).then(res => res.data);
export const deleteNote = id => api.delete(`/notes/${id}`);
export const newEdit = async id => {
  if(id !== undefined) {
    return api.post(`/notes/newEdit/${id}`,).then(res => res.data);
  } else
  return api.post(`/notes/newEdit`,).then(res => res.data);
}