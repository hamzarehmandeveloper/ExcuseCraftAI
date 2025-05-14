import { NextResponse } from 'next/server';
import { generateExcuse, ExcuseRequest } from '@/app/lib/agents/excuseAgent';

export async function POST(request: Request) {
  try {
    const { situation, audience, severity } = await request.json();
    
    if (!situation || !audience || !severity) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const excuseRequest: ExcuseRequest = {
      situation,
      audience,
      severity
    };

    const excuseContent = await generateExcuse(excuseRequest);
    
    return NextResponse.json({ content: excuseContent });
  } catch (error) {
    console.error('Error generating excuse:', error);
    return NextResponse.json(
      { error: 'Failed to generate excuse' },
      { status: 500 }
    );
  }
} 