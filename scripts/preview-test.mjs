import { preview } from "astro";

// The API keeps the process attached so Playwright owns its lifecycle, including in agent environments.
const server = await preview({ server: { host: "127.0.0.1", port: 4322 } });
process.once("SIGTERM", () => {
  void server.stop();
});
process.once("SIGINT", () => {
  void server.stop();
});
