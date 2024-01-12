import { type FastifyInstance } from "fastify";
import { db } from "../src/database";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { checkSessionIdExists } from "../src/middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance): Promise<any> {
  app.get(
    "/",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const transactions = await db("transactions")
        .where("session_id", sessionId)
        .select("*")
        .returning("*");

      return { transactions };
    },
  );

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const { sessionId } = request.cookies;

    const transaction = await db("transactions")
      .where({
        id,
        session_id: sessionId,
      })
      .first();

    return { transaction };
  });

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );
    console.log("title", title);
    console.log("amount", amount);
    console.log("type", type);

    let sessionId = request.cookies.sessionId;

    if (sessionId == null) {
      sessionId = randomUUID();

      try {
        void reply.cookie("sessionId", sessionId, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
        });
      } catch (error) {
        console.log("error", error);
      }
    }

    await db("transactions")
      .insert({
        id: randomUUID(),
        title,
        amount: type === "credit" ? amount : amount * -1,
        session_id: sessionId,
      })
      .returning("*");

    return await reply.status(201).send();
  });

  app.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const summary = await db("transactions")
        .where("session_id", sessionId)
        .sum("amount", { as: "amount" })
        .first();

      return { summary };
    },
  );
}
