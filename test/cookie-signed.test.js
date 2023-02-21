import express from "express";
import request from "supertest";
import cookieParser, { signedCookie } from "cookie-parser";

const app = express();

app.use(cookieParser("privatekey"));
app.use(express.json());

app.get('/', (req,res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post('/login', (req,res) => {
  const name = req.body.name;
  res.cookie("Login", name, {path: "/", signed: true});
  res.send(`Hello ${name}`);
});

test("test read cookie", async () =>{
  const response = await request(app).get("/")
  .set("cookie", "Login=s%3Aarifal.gRmOnOZdNXTIJ0SPLfnYy1MvOAivghRxnxxzPdPS5BM; Path=/");
  expect(response.text).toBe("Hello arifal");
});

test("test signed cookie", async () => {
  const response = await request(app).post("/login")
  .send({name: "arifal"});
  console.info(response.get("Set-Cookie").toString());
  expect(response.get("Set-Cookie").toString()).toContain("arifal");
  expect(response.text).toBe("Hello arifal");
});