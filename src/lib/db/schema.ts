import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

type framework = 'react' | 'solid' | 'svelte' | 'vue';
export const posts = pgTable('posts', {
  user: text('user').notNull(), // Clerk User ID
  id: varchar('id', { length: 36 }).primaryKey(), // Post ID (UUIDv4)
  content: text('content').notNull(), // Post content
  createdAt: timestamp('time', { mode: 'date' }).notNull().defaultNow(), // Time at which the post was created
  framework: varchar('framework', { length: 7 }).notNull().$type<framework>(), // Framework from which the post was made
});

export type TPost = typeof posts.$inferSelect;

export type TPostClient = Omit<TPost, 'user'> & {
  username: string;
  image: string;
};
