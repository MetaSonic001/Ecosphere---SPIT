import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const timelineData = req.body

      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      // Process the timeline data and create activities
      for (const entry of timelineData) {
        // This is a simplified example. You'll need to parse the Google Timeline JSON structure
        await prisma.activity.create({
          data: {
            userId,
            type: entry.type,
            value: entry.value,
            unit: entry.unit,
            timestamp: new Date(entry.timestamp),
          },
        })
      }

      res.status(200).json({ message: 'Timeline processed successfully' })
    } catch (error) {
      console.error('Error processing timeline:', error)
      res.status(500).json({ error: 'Failed to process timeline' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}