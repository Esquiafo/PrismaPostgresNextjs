import cors from "cors";
import type { NextApiResponse, NextApiRequest } from "next";

const corsMiddleware = cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export const corsHandler = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
