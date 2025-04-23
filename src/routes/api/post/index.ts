import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { auth } from 'clerk-solidjs/start/server';
import { json } from '@solidjs/router';
import { v4 } from 'uuid';

export async function POST({ request }: { request: Request }) {
  const { userId } = auth();
  if (!userId) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content } = await request.json();
  await db.insert(posts).values({
    content,
    user: userId,
    createdAt: new Date(),
    id: v4(),
    framework: 'solid',
  });

  return json({}, { status: 204 });
}
