import axios from 'axios';
let token = null;

const setToken = () => {
  const current = sessionStorage.getItem('currenUser');
  const currentUserData = JSON.parse(current);
  token = `bearer ${currentUserData.token}`;
};

const getAllByUser = async (baseUrl) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = (baseUrl, id) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  return axios.get(`${baseUrl}/${id}`, config);
};

const create = async (baseUrl, newObject) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (baseUrl, id, newObject) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteItem = async (baseUrl, id) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

//eslint-disable-next-line
export default {
  getAllByUser,
  getAll,
  create,
  update,
  deleteItem,
  getById,
  setToken,
};
