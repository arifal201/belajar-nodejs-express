import express from "express";
import request from "supertest";

const logger = (req,res,next) => {
  console.info(`receive logger : ${req.method} ${req.originalUrl}`);
  next();
}

const addPoweredBy = (req,res,next) => {
  res.set("x-powered-by","arifal hidayat");
  next();
}

const apiKeyMiddleware = (req,res,next) => {
  if(req.query.apiKey){
    next();
  }else{
    res.status(401).end();
  }
}

const requestTimeMiddleware = (req,res,next) => {
  req.requestTime = Date.now();
  next();
}

const app = express();

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredBy);

app.get('/', (req,res) => {
  res.send(`Hello Response`);
});

app.get('/time', (req,res) => {
  res.send(`Hello Today is ${req.requestTime}`);
});

test("test add attribute requestTime", async () =>{
  const response = await request(app).get("/time").query({apiKey: 'Arifal'});
  expect(response.text).toContain(`Hello Today is`);
});

test("test response middleware", async () =>{
  const response = await request(app).get("/").query({apiKey: 'Arifal'});
  expect(response.get("x-powered-by")).toBe("arifal hidayat");
});

test("test response middleware", async () =>{
  const response = await request(app).get("/");
  expect(response.status).toBe(401);
});