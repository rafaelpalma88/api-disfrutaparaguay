import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import supertest from "supertest";
import { app } from "../src/app";
import { execSync } from "node:child_process";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

beforeEach(async () => {
  execSync("npm run knex migrate:rollback --all");
  execSync("npm run knex migrate:latest");
});

describe("transaction routes", () => {
  test("user can create a new transaction", async () => {
    const response = await supertest(app.server)
      .post("/transactions")
      .send({ title: "New Transaction", amount: 5000, type: "credit" });

    expect(response.statusCode).toEqual(201);
  });

  test("user can get transactions list", async () => {
    const createTransactionResponse = await supertest(app.server)
      .post("/transactions")
      .send({ title: "New Transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionsResponse = await supertest(app.server)
      .get("/transactions")
      .set("Cookie", cookies);

    expect(listTransactionsResponse.statusCode).toEqual(200);
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({ title: "New Transaction", amount: 5000 }),
    ]);
  });

  test("user can get an specific transaction", async () => {
    const createTransactionResponse = await supertest(app.server)
      .post("/transactions")
      .send({ title: "New Transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionsResponse = await supertest(app.server)
      .get("/transactions")
      .set("Cookie", cookies);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    console.log("firstId", transactionId);

    const getTransactionResponseByID = await supertest(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies);

    console.log("getTransactionResponseByID", getTransactionResponseByID);

    expect(getTransactionResponseByID.statusCode).toEqual(200);
    expect(getTransactionResponseByID.body.transaction).toEqual(
      expect.objectContaining({ title: "New Transaction", amount: 5000 }),
    );
  });

  test("user can get a summary", async () => {
    const createTransactionResponse = await supertest(app.server)
      .post("/transactions")
      .send({ title: "New Transaction", amount: 5000, type: "credit" });

    const cookies = createTransactionResponse.get("Set-Cookie");

    await supertest(app.server)
      .post("/transactions")
      .send({ title: "New Transaction", amount: 3000, type: "credit" })
      .set("Cookie", cookies);

    await supertest(app.server)
      .post("/transactions")
      .send({ title: "New Transaction", amount: 200, type: "debit" })
      .set("Cookie", cookies);

    const summaryResponse = await supertest(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies);

    console.log("summaryResponse", summaryResponse);

    expect(summaryResponse.statusCode).toEqual(200);
    expect(summaryResponse.body.summary).toEqual({ amount: 7800 });
  });
});
