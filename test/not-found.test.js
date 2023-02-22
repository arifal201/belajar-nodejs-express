import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  res.send(`Hello Response`);
});

app.use((req,res,next) => {
  res.status(404).send("404 Not Found");
})

test("test express", async () =>{
  const response = await request(app).get("/").query({name: 'Arifal'});
  expect(response.text).toBe("Hello Response");
});

test("test not found", async () =>{
  const response = await request(app).get("/ups");
  expect(response.status).toBe(404);
  expect(response.text).toBe("404 Not Found");
});