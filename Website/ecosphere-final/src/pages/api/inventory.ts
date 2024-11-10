// pages/api/inventory.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all inventory items
      const inventory = await prisma.inventory.findMany();
      return res.status(200).json(inventory);
    } else if (req.method === 'POST') {
      // Add a new item to inventory
      const { name, quantity, category, expiryDate } = req.body;
      const newItem = await prisma.inventory.create({
        data: { name, quantity, category, expiryDate: new Date(expiryDate) },
      });
      return res.status(201).json(newItem);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
