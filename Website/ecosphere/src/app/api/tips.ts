import { NextResponse } from 'next/server';
import {prisma} from '../lib/prisma';

export async function GET() {
  try {
    const tips = await prisma.tip.findMany({
      include: {
        news: true,
      },
    });
    return NextResponse.json(tips);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tips' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tip = await prisma.tip.create({
      data,
    });
    return NextResponse.json(tip, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tip' },
      { status: 500 }
    );
  }
}