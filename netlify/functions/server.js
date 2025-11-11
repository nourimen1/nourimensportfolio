import { createRequestHandler } from "@netlify/remix-adapter/node";
import * as build from "../../build/server/index.js";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;

export const config = {
  path: "/*",
};


