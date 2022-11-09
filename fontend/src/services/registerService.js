import axios from 'axios';
const create = (baseUrl, newObject) => {
  return axios.post(baseUrl, newObject);
};

//eslint-disable-next-line
export default {
  create,
};
