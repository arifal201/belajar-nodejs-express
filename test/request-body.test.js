import express from "express";
import request from "supertest";

const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

app.post('/json', (req,res) => {
  const name = req.body.name;
  res.json(
    {
      message: `Hello ${name}`
    }
  );
});

app.post('/form', (req,res) => {
  const name = req.body.name;
  res.json(
    {
      message: `Hello ${name}`
    }
  );
});

test("test request json", async () =>{
  const response = await request(app)
  .post("/json")
  .set("content-type", "application/json")
  .send({name: "Arifal"});

  expect(response.body).toEqual({message: "Hello Arifal"});
});

test("test request form", async () =>{
  const response = await request(app)
  .post("/form")
  .set("content-type", "application/x-www-form-urlencoded")
  .send("name=Arifal");

  expect(response.body).toEqual({message: "Hello Arifal"});
});