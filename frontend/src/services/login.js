import axios from 'axios';

const baseUrl = '/api/singIn';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
const logout = () => {
  sessionStorage.removeItem('currentUser');
  sessionStorage.clear();
  window.location.href = '/';
};
//eslint-disable-next-line
export default {
  login,
  logout,
};
