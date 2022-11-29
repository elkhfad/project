import axios from 'axios';
let token = null;

const current = sessionStorage.getItem('currenUser');
const setToken = () => {
  const currentUserData = JSON.parse(current);
  token = `bearer ${currentUserData.token}`;
};
const create = (baseUrl, newObject) => {
  return axios.post(baseUrl, newObject);
};
const getUser = async (baseUrl) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const update = async (baseUrl, newObject) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}`, newObject, config);
  return response.data;
};

//eslint-disable-next-line
export default {
  create,
  getUser,
  update,
};
