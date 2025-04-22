import Post from '@/components/post';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TextArea } from '@/components/ui/textarea';
import { TextFieldRoot } from '@/components/ui/textfield';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { createAsync, query } from '@solidjs/router';
import { desc } from 'drizzle-orm';
import { For } from 'solid-js';

const getPosts = query(async () => {
  'use server';

  const dbPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return dbPosts;
}, 'posts');

export default function Home() {
  const posts = createAsync(() => getPosts());
  return (
    <main class="pt-8">
      <form>
        <Card class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>
              Posting from Verity <span class="font-bold text-[#315A99]">Solid</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TextFieldRoot>
              <TextArea />
            </TextFieldRoot>
          </CardContent>
          <CardFooter>
            <Button type="submit" class="cursor-pointer">
              Post!
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div class="mt-8 flex flex-col gap-4 pb-8">
        <For each={posts()}>
          {(post) => (
            <Post
              post={{
                ...post,
                username: 'james',
                image: 'https://www.arithefirst.com/images/teto.webp',
              }}
            />
          )}
        </For>
      </div>
    </main>
  );
}
