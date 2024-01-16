"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"), 1);

// src/database.ts
var import_config = require("dotenv/config");
var import_knex = __toESM(require("knex"), 1);

// src/env/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  console.log("node env test");
  import_dotenv.default.config({ path: ".env.test", override: true });
} else {
  console.log("node env else");
  import_dotenv.default.config();
}
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  PORT: import_zod.z.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables!", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/database.ts
if (process?.env?.DATABASE_URL == null) {
  throw new Error("DATABASE_URL env not found");
}
var config = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var db = (0, import_knex.default)(config);

// routes/transactions.ts
var import_node_crypto = require("crypto");
var import_zod2 = require("zod");

// src/middlewares/check-session-id-exists.ts
async function checkSessionIdExists(request, reply) {
  const { sessionId } = request.cookies;
  if (sessionId == null) {
    return await reply.status(401).send({
      error: "Unauthorized"
    });
  }
}

// routes/transactions.ts
async function transactionsRoutes(app2) {
  app2.get(
    "/",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;
      const transactions = await db("transactions").where("session_id", sessionId).select("*").returning("*");
      return { transactions };
    }
  );
  app2.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = getTransactionParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;
    const transaction = await db("transactions").where({
      id,
      session_id: sessionId
    }).first();
    return { transaction };
  });
  app2.post("/", async (request, reply) => {
    const createTransactionBodySchema = import_zod2.z.object({
      title: import_zod2.z.string(),
      amount: import_zod2.z.number(),
      type: import_zod2.z.enum(["credit", "debit"])
    });
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );
    console.log("title", title);
    console.log("amount", amount);
    console.log("type", type);
    let sessionId = request.cookies.sessionId;
    if (sessionId == null) {
      sessionId = (0, import_node_crypto.randomUUID)();
      try {
        void reply.cookie("sessionId", sessionId, {
          path: "/",
          maxAge: 1e3 * 60 * 60 * 24 * 7
          // 7days
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    await db("transactions").insert({
      id: (0, import_node_crypto.randomUUID)(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId
    }).returning("*");
    return await reply.status(201).send();
  });
  app2.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;
      const summary = await db("transactions").where("session_id", sessionId).sum("amount", { as: "amount" }).first();
      return { summary };
    }
  );
}

// src/app.ts
var import_cookie = __toESM(require("@fastify/cookie"), 1);
var app = (0, import_fastify.default)();
app.register(import_cookie.default);
app.register(transactionsRoutes, {
  prefix: "transactions"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
