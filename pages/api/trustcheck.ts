import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const LANGFLOW_API_URL = 'https://midget851-sharkgpt-restart-test.hf.space/api/v1/run/0823c5d1-4c8b-4e4e-95d0-971cb1a8b2e4'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { website } = req.body

  if (!website) {
    return res.status(400).json({ error: 'Website URL is required' })
  }

  try {
    const response = await axios.post(LANGFLOW_API_URL, {
      inputs: {
        text: website
      }
    })

    // Return full raw response for now
    return res.status(200).json({
      raw: response.data
    })
  } catch (error: any) {
    console.error('Langflow call failed:', error?.message)
    return res.status(500).json({ error: 'Failed to contact Langflow API' })
  }
}
