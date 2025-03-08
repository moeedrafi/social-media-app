import Image from "next/image";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { Post as PostType, User } from "@prisma/client";

import PostInfo from "@/components/feed/PostInfo";
import CommentSection from "@/components/feed/CommentSection";
import PostInteraction from "@/components/feed/PostInteraction";

type FeedPostType = PostType & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId } = await auth();

  return (
    <div className="flex flex-col gap-4">
      {/* USER INFO */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>

        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>

      {/* DSEC */}
      <div className="flex flex-col gap-4">
        <p>{post.desc}</p>
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* POST INTERACTION */}
      <Suspense fallback="loading">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>

      {/* COMMENTS */}
      <Suspense fallback="loading">
        <CommentSection postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
