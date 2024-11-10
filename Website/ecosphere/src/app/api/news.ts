import { NextResponse } from 'next/server';
import {prisma} from '../lib/prisma';

export async function GET() {
  try {
    const newsItems = await prisma.newsItem.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        tips: true,
      },
    });
    return NextResponse.json(newsItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newsItem = await prisma.newsItem.create({
      data,
    });
    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create news item' },
      { status: 500 }
    );
  }
}