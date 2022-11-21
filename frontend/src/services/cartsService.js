import axios from 'axios';
let token = null;

const setToken = () => {
  const current = sessionStorage.getItem('currenUser');
  const currentUserData = JSON.parse(current);
  token = `bearer ${currentUserData.token}`;
};
const getAllCartByUser = async (baseUrl) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const getCartWishIsTrue = async (baseUrl) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const create = async (baseUrl, newObject) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const buyUpdate = async (baseUrl, newObject, id) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
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
const getById = (baseUrl, id) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  return axios.get(`${baseUrl}/${id}`, config);
};
const deleteCart = async (baseUrl, id) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
//eslint-disable-next-line
export default {
  create,
  update,
  getAllCartByUser,
  getById,
  getCartWishIsTrue,
  buyUpdate,
  deleteCart,
};
