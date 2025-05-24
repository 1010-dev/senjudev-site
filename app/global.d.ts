import type {} from "hono";

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: {
      CONNPASS_API_KEY: string;
    };
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}
