import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      // Fetch user's recent activities
      const recentActivities = await prisma.activity.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: 10,
      })

      // Generate suggestions based on recent activities
      const suggestions = generateSuggestions(recentActivities)

      res.status(200).json(suggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      res.status(500).json({ error: 'Failed to fetch suggestions' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}

function generateSuggestions(activities: any[]): string[] {
  // Implement your suggestion logic here based on the user's activities
  // This is a simplified example
  const suggestions = [
    'Try carpooling to reduce your travel emissions',
    'Switch to energy-efficient light bulbs to save electricity',
    'Consider a plant-based meal once a week to reduce your carbon footprint',
  ]
  return suggestions
}