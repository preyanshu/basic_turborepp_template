import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello from Elysia server!")
  .get("/api/health", () => ({
    status: "ok",

    timestamp: new Date().toISOString(),
  }))
  .listen(3001);

console.log(
  `🦊 Elysia server is running at http://localhost:${app.server?.port}`,
);
