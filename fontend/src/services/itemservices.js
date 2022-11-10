import axios from 'axios';
let token = null;

const setToken = () => {
  const current = sessionStorage.getItem('currenUser');
  const currentUserData = JSON.parse(current);
  token = `bearer ${currentUserData.token}`;
};

const getAll = async (baseUrl) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getById = (baseUrl, id) => {
  return axios.get(`${baseUrl}/${id}`);
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
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteItem = async (baseUrl, id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

//eslint-disable-next-line
export default {
  getAll,
  create,
  update,
  deleteItem,
  getById,
  setToken,
};
