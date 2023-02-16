import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  res.set({
    "x-powered-by" : "arifal hidayat",
    "X-Author" : "arifal hidayat"
  });
  res.send(`Hello Response`);
});

test("test response header", async () =>{
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
  expect(response.get("x-powered-by")).toBe("arifal hidayat");
  expect(response.get("x-author")).toBe("arifal hidayat");
});