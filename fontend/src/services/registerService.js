import axios from 'axios';
const create = (baseUrl, newObject) => {
  return axios.post(baseUrl, newObject);
};
const getById = (baseUrl, id) => {
  return axios.get(`${baseUrl}/${id}`);
};
//eslint-disable-next-line
export default {
  create,
  getById,
};
