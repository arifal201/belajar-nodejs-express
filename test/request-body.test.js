import express, { text } from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";

const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(expressFileUpload());

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

app.post("/file", async (req,res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + "/upload/" + textFile.name);

  res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

test("test request file upload", async () =>{
  const response = await request(app)
  .post("/file")
  .set("content-type", "multipart/form-data")
  .field("name", "Arifal")
  .attach("article", __dirname + "/sample.txt");

  expect(response.text).toBe("Hello Arifal, you uploaded sample.txt");
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