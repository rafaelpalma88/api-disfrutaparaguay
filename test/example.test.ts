import { afterAll, beforeAll, expect, test } from "vitest";
import supertest from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("user can create a new transaction", async () => {
  const response = await supertest(app.server)
    .post("/transactions")
    .send({ title: "New Transaction", amount: 5000, type: "credit" });

  expect(response.statusCode).toEqual(201);
});
