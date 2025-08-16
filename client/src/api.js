import axios from 'axios';

export const getNotes = () => axios.get('/api/notes').then(res => res.data);
export const createNote = data => axios.post('/api/notes', data).then(res => res.data);
export const updateNote = (id, data) => axios.put(`/api/notes/${id}`, data).then(res => res.data);
export const deleteNote = id => axios.delete(`/api/notes/${id}`);
export const clearHovers = () => axios.post(`/api/notes/clearHovers`).then(res => res.data);