import Post from '@/components/post';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TextArea } from '@/components/ui/textarea';
import { TextFieldRoot } from '@/components/ui/textfield';
import { db } from '@/lib/db';
import { posts, TPostClient } from '@/lib/db/schema';
import { createClerkClient } from '@clerk/backend';
import { createAsync, query, action } from '@solidjs/router';
import { SignedIn } from 'clerk-solidjs';
import { desc } from 'drizzle-orm';
import { For, Show, Suspense } from 'solid-js';
import Loading from '@/components/loader';

const createPost = action(async (formData: FormData) => {
  const content = formData.get('content');

  await fetch('/api/post/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
});

const getPosts = query(async () => {
  'use server';

  const ctx = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const dbPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const userPosts: TPostClient[] = [];

  for (const post of dbPosts) {
    const user = await ctx.users.getUser(post.user);
    userPosts.push({
      ...post,
      username: user.username!,
      image: user.imageUrl,
    });
  }

  return userPosts;
}, 'posts');

export default function Home() {
  const posts = createAsync(() => getPosts());
  return (
    <main class="pt-8">
      <SignedIn>
        <form action={createPost} method="post">
          <Card class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Posting from Verity <span class="font-bold text-[#315A99]">Solid</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TextFieldRoot>
                <TextArea id="content" name="content" class="min-h-24" />
              </TextFieldRoot>
            </CardContent>
            <CardFooter>
              <Button type="submit" class="cursor-pointer">
                Post!
              </Button>
            </CardFooter>
          </Card>
        </form>
      </SignedIn>
      <div class="mt-8 flex flex-col gap-4 pb-8">
        <Suspense
          fallback={
            <div class="flex w-full items-center justify-center">
              <Loading />
            </div>
          }
        >
          <Show when={posts()} fallback={<></>}>
            <For each={posts()}>{(post) => <Post post={post} />}</For>
          </Show>
        </Suspense>
      </div>
    </main>
  );
}
