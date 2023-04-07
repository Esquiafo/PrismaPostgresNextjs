import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.origin !== 'http://localhost:3000') {
    return res.status(403).json({ error: 'Invalid origin' });
  }

  // Handle the API request here
  res.status(200).json({ message: 'API request successful' });
}
