import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();

router.use((req,res,next) => {
  console.info(`Receive request ${req.originalUrl}`);
  next();
});

router.get('/product/a', (req,res) => {
  res.send("get product a");
});

test("test router disable", async () =>{
  let response = await request(app).get("/product/a");
  expect(response.status).toBe(404);
});

test("test router enable", async () =>{
  app.use(router);
  let response = await request(app).get("/product/a");
  expect(response.text).toBe("get product a");
});