import axios from 'axios';

const getAll = (baseUrl) => {
  return axios.get(baseUrl);
};
const getById = (baseUrl, id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (baseUrl, newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (baseUrl, id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteItem = (baseUrl, id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

//eslint-disable-next-line
export default {
  getAll,
  create,
  update,
  deleteItem,
  getById,
};
