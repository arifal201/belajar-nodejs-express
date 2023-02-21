import express from "express";
import request from "supertest";

const app = express();

const errMiddleware = (err,req,res,next) => {
  res.status(500).send(`Terjadi Kesalahan : ${err.message}`);
};

app.get('/', (req,res) => {
  throw new Error("error in line 1");
});

app.use(errMiddleware);

test("test express", async () =>{
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Kesalahan : error in line 1");
});