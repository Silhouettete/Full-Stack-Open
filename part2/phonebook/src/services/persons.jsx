import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNewPerson = (newNameObject) => {
  const request = axios.post(baseUrl, newNameObject);
  return request.then((response) => response.data);
};

const updatePersonList = (name, newNameObject) => {
  const request = axios.put(`${baseUrl}/${name}`, newNameObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default {
  getAll: getAll,
  createNewPerson: createNewPerson,
  updatePersonList: updatePersonList,
  deletePerson: deletePerson,
};
