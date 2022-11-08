import axios from 'axios';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = (baseUrl) => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const getById = (baseUrl, id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = async (baseUrl, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (baseUrl, id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteItem = (baseUrl, id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
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
