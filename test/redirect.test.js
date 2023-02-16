import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req,res) => {
  res.redirect('/to-next-page');
});

test("test express", async () =>{
  const response = await request(app).get("/").query({name: 'Arifal'});
  expect(response.status).toBe(302);
  expect(response.get("Location")).toBe('/to-next-page');
});