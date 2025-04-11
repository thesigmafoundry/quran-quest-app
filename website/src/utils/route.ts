import { NextRequest } from 'next/server';
import { addToWaitlist, recordPageVisit } from '../api';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, childrenCount, childrenAgeRange, message, phone } = data;
    
    // Validate required fields
    if (!name || !email || !childrenCount || !childrenAgeRange) {
      return Response.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    // Add to waitlist
    const result = await addToWaitlist(
      request.env.DB,
      name,
      email,
      childrenCount,
      childrenAgeRange,
      message || '',
      phone || ''
    );
    
    if (result.success) {
      return Response.json({ success: true, id: result.id });
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in waitlist API:', error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Record page visit
    await recordPageVisit(
      request.env.DB,
      '/waitlist',
      request.headers.get('referer') || '',
      request.headers.get('user-agent') || '',
      request.headers.get('x-forwarded-for') || request.ip || ''
    );
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error recording page visit:', error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
