import express from "express";
import request from "supertest";

const app = express();

app.get('/product/:id', (req,res) => {
  res.send(`Product : ${req.params.id}`);
});

app.get('/categories/:id(\\d+)', (req,res) => {
  res.send(`Category : ${req.params.id}`);
});

test("test route parameter", async () =>{
  let response = await request(app).get("/product/1");
  expect(response.text).toBe("Product : 1");

  response = await request(app).get("/product/create");
  expect(response.text).toBe("Product : create");

  response = await request(app).get("/categories/1982");
  expect(response.text).toBe("Category : 1982");

  response = await request(app).get("/categories/index");
  expect(response.status).toBe(404);
});