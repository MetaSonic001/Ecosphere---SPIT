import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const challenges = await prisma.challenge.findMany({
        include: {
          userChallenges: {
            where: { userId },
          },
        },
      })

      const formattedChallenges = challenges.map(challenge => ({
        id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        progress: calculateProgress(challenge, userId),
        joined: challenge.userChallenges.length > 0,
      }))

      res.status(200).json(formattedChallenges)
    } catch (error) {
      console.error('Error fetching challenges:', error)
      res.status(500).json({ error: 'Failed to fetch challenges' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}

function calculateProgress(challenge: any, userId: string): number {
  // Implement your progress calculation logic here
  // This is a placeholder implementation
  const userChallenge = challenge.userChallenges.find(uc => uc.userId === userId)
  return userChallenge ? userChallenge.progress : 0
}