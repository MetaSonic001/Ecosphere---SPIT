import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const habits = await prisma.habit.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })

      res.status(200).json(habits)
    } catch (error) {
      console.error('Error fetching habits:', error)
      res.status(500).json({ error: 'Failed to fetch habits' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}