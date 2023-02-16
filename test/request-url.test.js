import express from "express";
import request from "supertest";

const app = express();

app.get('/arifal', (req,res) => {
  res.json({
    path: req.path,
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure
  });
});

test("test express", async () =>{
  const response = await request(app).get("/arifal").query({name: 'Arifal'});
  expect(response.body).toEqual({
    path: "/arifal",
    originalUrl: "/arifal?name=Arifal",
    hostname: "127.0.0.1",
    protocol: "http",
    secure: false
  });
});