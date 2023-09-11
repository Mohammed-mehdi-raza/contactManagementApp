import express from "express";
import http from "http";
import cors from "cors";

import routes from "../routes/routes.js";
import './db/conn.js';

const app = express();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/test',(req,res)=>{
    res.send("hello");
});

app.use('/',routes);

server.listen(PORT,()=>{
    console.log(`server running on port:${PORT}`);
})