import { NextResponse } from 'next/server';
import { sentientWebBrowse } from '@/utils/sentientWebBrowse';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const result = await sentientWebBrowse(prompt);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in sentientWebBrowse API route:', error);
    return NextResponse.json({ success: false, error: 'Sentient web browsing error' }, { status: 500 });
  }
}