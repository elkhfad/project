import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/singIn';

const login = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
const logout = () => {
  sessionStorage.removeItem('currentUser');
  sessionStorage.clear();
  window.location.reload();
};
//eslint-disable-next-line
export default {
  login,
  logout,
};
