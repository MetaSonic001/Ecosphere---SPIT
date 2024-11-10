import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query
      const { completed } = req.body
      
      // TODO: Add user authentication and get the user ID
      const userId = 'user_id_here'

      const updatedHabit = await prisma.habit.update({
        where: { id: id as string, userId },
        data: { completed },
      })

      res.status(200).json(updatedHabit)
    } catch (error) {
      console.error('Error updating habit:', error)
      res.status(500).json({ error: 'Failed to update habit' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(Method ${req.method} Not Allowed)
  }
}