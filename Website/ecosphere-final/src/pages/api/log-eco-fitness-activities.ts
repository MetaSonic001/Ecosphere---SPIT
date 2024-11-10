import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, duration, distance } = req.body
      
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const activity = await prisma.ecoFitnessActivity.create({
        data: {
          userId,
          type,
          duration: parseInt(duration),
          distance: parseFloat(distance),
          timestamp: new Date(),
        },
      })

      res.status(200).json(activity)
    } catch (error) {
      console.error('Error logging eco-fitness activity:', error)
      res.status(500).json({ error: 'Failed to log eco-fitness activity' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}