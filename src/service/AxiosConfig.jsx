// axiosInstance.js
import axios from "axios";

const baseURL = "http://localhost:3006/contacts";

export const getContact = () => {
  return axios.get(baseURL);
};

export const createContact = (contact) => {
  return axios.post(baseURL, contact);
};

export const deleteContact = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export const updateContact = (id, contact) => {
  return axios.put(`${baseURL}/${id}`, contact);
};
