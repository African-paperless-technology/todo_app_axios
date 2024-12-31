// axiosInstance.js
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:3006/contacts";

// Supprimez "/contacts" de baseURL car il est déjà inclus
const BASE_API = baseURL.endsWith('/contacts') ? baseURL : `${baseURL}/contacts`;

export const getContact = () => {
  return axios.get(BASE_API);
};

export const createContact = (contact) => {
  return axios.post(BASE_API, contact);
};

export const removeContact = (id) => {
  return axios.delete(`${BASE_API}/${id}`);
};

export const updateContact = (id, contact) => {
  return axios.put(`${BASE_API}/${id}`, contact);
};





// // axiosInstance.js
// import axios from "axios";

// const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:3006/contacts";

// const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     'Access-Control-Allow-Origin': '*', // Autoriser toutes les origines
//     'Content-Type': 'application/json', // Type de contenu
//   },
// });

// // Fonction pour obtenir un contact
// export const getContact = () => {
//   return axiosInstance.get('/');
// };

// // Fonction pour créer un contact
// export const createContact = (contact) => {
//   return axiosInstance.post('/', contact);
// };

// // Fonction pour supprimer un contact
// export const deleteContact = (id) => {
//   return axiosInstance.delete(`/${id}`);
// };

// // Fonction pour mettre à jour un contact
// export const updateContact = (id, contact) => {
//   return axiosInstance.put(`/${id}`, contact);
// };