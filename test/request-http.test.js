import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  res.send(`Hello ${req.query.name}`);
});

test("test express", async () =>{
  const response = await request(app).get("/").query({name: 'Arifal'});
  expect(response.text).toBe("Hello Arifal");
});