"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const node_child_process_1 = require("node:child_process");
(0, vitest_1.beforeAll)(async () => {
    await app_1.app.ready();
});
(0, vitest_1.afterAll)(async () => {
    await app_1.app.close();
});
(0, vitest_1.beforeEach)(async () => {
    (0, node_child_process_1.execSync)("npm run knex migrate:rollback --all");
    (0, node_child_process_1.execSync)("npm run knex migrate:latest");
});
(0, vitest_1.describe)("transaction routes", () => {
    (0, vitest_1.test)("user can create a new transaction", async () => {
        const response = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({ title: "New Transaction", amount: 5000, type: "credit" });
        (0, vitest_1.expect)(response.statusCode).toEqual(201);
    });
    (0, vitest_1.test)("user can get transactions list", async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({ title: "New Transaction", amount: 5000, type: "credit" });
        const cookies = createTransactionResponse.get("Set-Cookie");
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get("/transactions")
            .set("Cookie", cookies);
        (0, vitest_1.expect)(listTransactionsResponse.statusCode).toEqual(200);
        (0, vitest_1.expect)(listTransactionsResponse.body.transactions).toEqual([
            vitest_1.expect.objectContaining({ title: "New Transaction", amount: 5000 }),
        ]);
    });
    (0, vitest_1.test)("user can get an specific transaction", async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({ title: "New Transaction", amount: 5000, type: "credit" });
        const cookies = createTransactionResponse.get("Set-Cookie");
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get("/transactions")
            .set("Cookie", cookies);
        const transactionId = listTransactionsResponse.body.transactions[0].id;
        console.log("firstId", transactionId);
        const getTransactionResponseByID = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${transactionId}`)
            .set("Cookie", cookies);
        console.log("getTransactionResponseByID", getTransactionResponseByID);
        (0, vitest_1.expect)(getTransactionResponseByID.statusCode).toEqual(200);
        (0, vitest_1.expect)(getTransactionResponseByID.body.transaction).toEqual(vitest_1.expect.objectContaining({ title: "New Transaction", amount: 5000 }));
    });
    (0, vitest_1.test)("user can get a summary", async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({ title: "New Transaction", amount: 5000, type: "credit" });
        const cookies = createTransactionResponse.get("Set-Cookie");
        await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({ title: "New Transaction", amount: 3000, type: "credit" })
            .set("Cookie", cookies);
        await (0, supertest_1.default)(app_1.app.server)
            .post("/transactions")
            .send({ title: "New Transaction", amount: 200, type: "debit" })
            .set("Cookie", cookies);
        const summaryResponse = await (0, supertest_1.default)(app_1.app.server)
            .get("/transactions/summary")
            .set("Cookie", cookies);
        console.log("summaryResponse", summaryResponse);
        (0, vitest_1.expect)(summaryResponse.statusCode).toEqual(200);
        (0, vitest_1.expect)(summaryResponse.body.summary).toEqual({ amount: 7800 });
    });
});
