import axios from "axios";
import { Contact } from "../types/contact";

// const url = "http://localhost:5000/";
const url ="https://contact-management-app-api.onrender.com/"

const API = axios.create({baseURL:url});

export const fetchContacts = () => API.get('/contacts');
export const fetchContact = (id:string) => API.get(`/contacts/${id}`);
export const createContact = (contact:Contact) => API.post('/contacts',contact);
export const updateContact = (contact:Contact,id:string) => API.put(`/contacts/${id}`,contact);
export const deleteContact = (id:string) => API.delete(`/contacts/${id}`);
export const searchContact = (name:string) => API.get(`/contact/${name}`);