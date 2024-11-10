import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      // Fetch user's activities for the past 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const activities = await prisma.activity.findMany({
        where: {
          userId,
          timestamp: {
            gte: thirtyDaysAgo,
          },
        },
        orderBy: { timestamp: 'asc' },
      })

      // Process activities into emissions data
      const emissionsData = processEmissionsData(activities)

      res.status(200).json(emissionsData)
    } catch (error) {
      console.error('Error fetching emissions data:', error)
      res.status(500).json({ error: 'Failed to fetch emissions data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}

function processEmissionsData(activities: any[]) {
  // Implement your emissions calculation logic here
  // This is a simplified example
  const labels = activities.map(a => a.timestamp.toISOString().split('T')[0])
  const values = activities.map(a => calculateEmissions(a))

  return { labels, values }
}

function calculateEmissions(activity: any): number {
  // Implement your emissions calculation logic here
  // This is a placeholder implementation
  switch (activity.type) {
    case 'travel':
      return activity.value * 0.1 // Example: 0.1 kg CO2 per km
    case 'energy':
      return activity.value * 0.5 // Example: 0.5 kg CO2 per kWh
    default:
      return 0
  }
}