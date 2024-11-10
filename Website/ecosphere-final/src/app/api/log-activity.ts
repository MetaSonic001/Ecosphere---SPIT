import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, value, unit } = req.body
      
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const activity = await prisma.activity.create({
        data: {
          userId,
          type,
          value: parseFloat(value),
          unit,
        },
      })

      res.status(200).json(activity)
    } catch (error) {
      console.error('Error logging activity:', error)
      res.status(500).json({ error: 'Failed to log activity' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}