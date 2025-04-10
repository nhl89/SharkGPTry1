
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.body;

  try {
    const response = await axios.post(
      'https://midget851-sharkgpt-restart-test.hf.space/api/v1/run/0823c5d1-4c8b-4e4e-95d0-971cb1a8b2e4',
      { input },
      { headers: { 'Content-Type': 'application/json' } }
    );

    res.status(200).json({ result: response.data.result || JSON.stringify(response.data) });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch from Langflow API" });
  }
}
