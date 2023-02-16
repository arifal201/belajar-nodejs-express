import express from "express";
import request from "supertest";

const app = express();

app.get('/product/*.json', (req,res) => {
  res.send(`${req.originalUrl}`);
});

app.get('/categories/*(\\d+).json', (req,res) => {
  res.send(`${req.originalUrl}`);
});

test("test route path", async () =>{
  let response = await request(app).get("/product/index.json");
  expect(response.text).toBe("/product/index.json");

  response = await request(app).get("/product/create.json");
  expect(response.text).toBe("/product/create.json");

  response = await request(app).get("/categories/1982.json");
  expect(response.text).toBe("/categories/1982.json");

  response = await request(app).get("/categories/index.json");
  expect(response.status).toBe(404);
});