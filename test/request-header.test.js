import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  const type = req.get("accept");
  res.send(`Hello ${type}`);
});

test("test request header", async () =>{
  const response = await request(app).get("/").set("accept","text/plain");
  expect(response.text).toBe("Hello text/plain");
});