import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

app.get('/', (req,res) => {
  res.send('hello world');
});

test("test express", async () =>{
  const response = await request(app).get("/");
  expect(response.text).toBe("hello world");
});