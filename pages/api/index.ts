import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers['sec-fetch-site']) {
    return res.status(403).json('Unauthorized');
  }

  // Handle the API request here
  res.status(200).json("OK API");
}
