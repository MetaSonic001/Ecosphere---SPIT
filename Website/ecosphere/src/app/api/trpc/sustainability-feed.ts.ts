import { NextResponse } from 'next/server'
import {prisma} from '../../lib/prisma'

export async function GET() {
  try {
    const [newsArticles, tips] = await Promise.all([
      prisma.newsArticle.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 10,
      }),
      prisma.tip.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

    return NextResponse.json({ newsArticles, tips })
  } catch (error) {
    console.error('Error fetching sustainability feed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { newsArticles, tips } = await request.json()

    await Promise.all([
      ...newsArticles.map((article: any) =>
        prisma.newsArticle.create({ data: article })
      ),
      ...tips.map((tip: any) => prisma.tip.create({ data: tip })),
    ])

    return NextResponse.json({ message: 'Data updated successfully' })
  } catch (error) {
    console.error('Error updating sustainability feed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}