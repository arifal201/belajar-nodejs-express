import express from "express";
import request from "supertest";

const app = express();

// app.use(express.static(__dirname + "/static"));
app.use("/static",express.static(__dirname + "/static"));

app.get('/', (req,res) => {
  res.send('hello world');
});

app.get('/test-static.txt', (req,res) => {
  res.send('hello world');
});

test("test static file", async () =>{
  const response = await request(app).get("/");
  expect(response.text).toBe("hello world");
});

test("test static file test static", async () =>{
  const response = await request(app).get("/test-static.txt");
  expect(response.text).toContain("hello world");
});

test("test static file test static", async () =>{
  const response = await request(app).get("/static/test-static.txt");
  expect(response.text).toContain("test static text");
});