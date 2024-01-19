"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const database_1 = require("../src/database");
const node_crypto_1 = require("node:crypto");
const zod_1 = require("zod");
const check_session_id_exists_1 = require("../src/middlewares/check-session-id-exists");
async function transactionsRoutes(app) {
    app.get("/", { preHandler: [check_session_id_exists_1.checkSessionIdExists] }, async (request, reply) => {
        const { sessionId } = request.cookies;
        const transactions = await (0, database_1.db)("transactions")
            .where("session_id", sessionId)
            .select("*")
            .returning("*");
        return { transactions };
    });
    app.get("/:id", { preHandler: [check_session_id_exists_1.checkSessionIdExists] }, async (request) => {
        const getTransactionParamsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getTransactionParamsSchema.parse(request.params);
        const { sessionId } = request.cookies;
        const transaction = await (0, database_1.db)("transactions")
            .where({
            id,
            session_id: sessionId,
        })
            .first();
        return { transaction };
    });
    app.post("/", async (request, reply) => {
        const createTransactionBodySchema = zod_1.z.object({
            title: zod_1.z.string(),
            amount: zod_1.z.number(),
            type: zod_1.z.enum(["credit", "debit"]),
        });
        const { title, amount, type } = createTransactionBodySchema.parse(request.body);
        let sessionId = request.cookies.sessionId;
        if (sessionId == null) {
            sessionId = (0, node_crypto_1.randomUUID)();
            try {
                void reply.cookie("sessionId", sessionId, {
                    path: "/",
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
                });
            }
            catch (error) {
                console.log("error", error);
            }
        }
        await (0, database_1.db)("transactions")
            .insert({
            id: (0, node_crypto_1.randomUUID)(),
            title,
            amount: type === "credit" ? amount : amount * -1,
            session_id: sessionId,
        })
            .returning("*");
        return await reply.status(201).send();
    });
    app.get("/summary", { preHandler: [check_session_id_exists_1.checkSessionIdExists] }, async (request, reply) => {
        const { sessionId } = request.cookies;
        const summary = await (0, database_1.db)("transactions")
            .where("session_id", sessionId)
            .sum("amount", { as: "amount" })
            .first();
        return { summary };
    });
}
exports.transactionsRoutes = transactionsRoutes;
