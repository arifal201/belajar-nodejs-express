import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test("test express", async () =>{
  const response = await request(app).get("/").query({firstName: 'Arifal', lastName: "Hidayat"});
  expect(response.text).toBe("Hello Arifal Hidayat");
});