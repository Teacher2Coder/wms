import axios from '../axios-config.js';

const login = async (username, password) => {
  const response = await axios.post('/api/auth/login', { username, password });
  return response.data;
}

const myInfo = async () => {
  const response = await axios.get('/api/auth/me');
  return response.data;
}

const register = async (username, password, firstName, lastName, role) => {
  const response = await axios.post('/api/auth/register', { username, password, firstName, lastName, role });
  return response.data;
}

const changePassword = async (currentPassword, newPassword) => {
  const response = await axios.post('/api/auth/change-password', { currentPassword, newPassword });
  return response.data;
}

const getAllUsers = async () => {
  const response = await axios.get('/api/auth/users');
  return response.data;
}

const updateUser = async (id, username, firstName, lastName, role) => {
  const response = await axios.put(`/api/auth/users/${id}`, { username, firstName, lastName, role });
  return response.data;
}

const deleteUser = async (id) => {
  const response = await axios.delete(`/api/auth/users/${id}`);
  return response.data;
}

export default { 
  login,
  myInfo,
  register,
  changePassword,
  getAllUsers,
  updateUser,
  deleteUser 
};