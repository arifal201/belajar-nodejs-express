import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  res.send('hello');
});

app.listen(3004, () =>{
  console.log("server is running on port 3004");
});

