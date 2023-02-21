import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/', (req,res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

app.post('/login', (req,res) => {
  const name = req.body.name;
  res.cookie("Login", name, {path: "/"});
  res.send(`Hello ${name}`);
});

test("test read cookie", async () =>{
  const response = await request(app).get("/")
  .set("cookie", "name=arifal;author=arifal hidayat salamulloh");
  expect(response.text).toBe("Hello arifal");
});

test("test write cookie", async () => {
  const response = await request(app).post("/login")
  .send({name: "arifal"});
  expect(response.get("Set-Cookie").toString()).toBe("Login=arifal; Path=/")
  expect(response.text).toBe("Hello arifal");
});