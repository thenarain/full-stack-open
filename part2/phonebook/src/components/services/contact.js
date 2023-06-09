import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject);
  return response.then((response) => response.data);
};

const remove = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((response) => response.data);
};

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject);
  return response.then((response) => response.data);
};

export default { getAll, create, remove, update };
