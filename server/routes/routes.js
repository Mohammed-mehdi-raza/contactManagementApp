import express from "express";

import {getAllContact,getContact,createContact,updateContact,deleteContact,searchContact } from "../controllers/controllers.js";

const Router = express.Router();

Router.get('/contacts',getAllContact);
Router.get('/contacts/:id',getContact);
Router.post('/contacts',createContact);
Router.put('/contacts/:id',updateContact);
Router.delete('/contacts/:id',deleteContact);
Router.get('/contact/:name',searchContact);


export default Router;