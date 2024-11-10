import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query
      
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const userChallenge = await prisma.userChallenge.create({
        data: {
          userId,
          challengeId: id as string,
          progress: 0,
        },
      })

      res.status(200).json(userChallenge)
    } catch (error) {
      console.error('Error joining challenge:', error)
      res.status(500).json({ error: 'Failed to join challenge' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}