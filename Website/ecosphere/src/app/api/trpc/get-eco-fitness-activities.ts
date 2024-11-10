import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const activities = await prisma.ecoFitnessActivity.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: 10,
      })

      const formattedActivities = activities.map(activity => ({
        ...activity,
        carbonSaved: calculateCarbonSaved(activity),
      }))

      res.status(200).json(formattedActivities)
    } catch (error) {
      console.error('Error fetching eco-fitness activities:', error)
      res.status(500).json({ error: 'Failed to fetch eco-fitness activities' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}

function calculateCarbonSaved(activity: any): number {
  // Implement your carbon saving calculation logic here
  // This is a placeholder implementation
  const carbonPerKm = 0.2 // Example: 0.2 kg CO2 saved per km
  return activity.distance * carbonPerKm
}