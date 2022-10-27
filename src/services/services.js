import axios from 'axios';

const getAll = (baseUrl) => {
  return axios.get(baseUrl);
};

const create = (baseUrl, newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (baseUrl, id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
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
};
