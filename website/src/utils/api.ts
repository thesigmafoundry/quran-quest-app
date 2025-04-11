import { D1Database } from '@cloudflare/workers-types';

export async function addToWaitlist(
  db: D1Database,
  name: string,
  email: string,
  childrenCount: string,
  childrenAgeRange: string,
  message: string = '',
  phone: string = ''
) {
  try {
    const result = await db.prepare(
      `INSERT INTO waiting_list (name, email, phone, children_count, children_age_range, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(name, email, phone, childrenCount, childrenAgeRange, message)
    .run();
    
    return { success: true, id: result.meta.last_row_id };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function recordPageVisit(
  db: D1Database,
  page: string,
  referrer: string = '',
  userAgent: string = '',
  ipAddress: string = ''
) {
  try {
    await db.prepare(
      `INSERT INTO page_visits (page, referrer, user_agent, ip_address)
       VALUES (?, ?, ?, ?)`
    )
    .bind(page, referrer, userAgent, ipAddress)
    .run();
    
    return { success: true };
  } catch (error) {
    console.error('Error recording page visit:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getWaitlistCount(db: D1Database) {
  try {
    const result = await db.prepare('SELECT COUNT(*) as count FROM waiting_list').first();
    return { success: true, count: result?.count || 0 };
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', count: 0 };
  }
}
