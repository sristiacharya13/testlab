import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url, method, headers, body } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'API URL is required' });
  }

  try {
    const response = await axios({
      url,
      method,
      headers,
      data: method !== 'GET' ? body : null,
    });

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
