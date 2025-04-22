import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { TPostClient } from '@/lib/db/schema';
import { A } from '@solidjs/router';

const frameWorkColors = {
  svelte: 'text-[#FF3E00]',
  react: 'text-[#66DBFB]',
  solid: 'text-[#315A99]',
  vue: 'text-[#3FB27F]',
};

export default function Post({ post }: { post: TPostClient }) {
  return (
    <Card class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
      <CardHeader>
        <CardTitle class="flex items-center justify-start gap-2 font-normal">
          <img
            class="rounded-full"
            src={post.image}
            alt={`verity user @${post.username}'s profile photo`}
            width={20}
            height={20}
          />
          <div>
            <A href={`/user/${post.username}`} class="font-bold">
              @{post.username}
            </A>
            <span class="text-muted-foreground"> on Verity </span>
            <span class={`${frameWorkColors[post.framework]} font-bold`}>
              {post.framework.charAt(0).toUpperCase() + post.framework.slice(1)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent class="text-xl">{post.content}</CardContent>
      <CardFooter class="text-muted-foreground text-sm font-light">
        {post.createdAt.toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </CardFooter>
    </Card>
  );
}
