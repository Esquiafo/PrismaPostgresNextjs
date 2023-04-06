import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type CorsMiddleware = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const allowCors: CorsMiddleware = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin as any);
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  await fn(req, res);
};

const handler: NextApiHandler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

export default allowCors(handler);
