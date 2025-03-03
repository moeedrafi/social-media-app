import prisma from "@/lib/client";
import Post from "@/components/feed/Post";
import { auth } from "@clerk/nextjs/server";
import { Post as PostType, User } from "@prisma/client";

type Posts = PostType & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();
  let posts: Posts[] = [];

  // Show your own posts (Profile Page)
  if (username) {
    posts = await prisma.post.findMany({
      where: { user: { username } },
      include: {
        user: true,
        likes: { select: { userId: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  // Show the posts of users you are following (Home Page)
  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = following.map((f) => f.followingId);
    const ids = [userId, ...followingIds];

    posts = await prisma.post.findMany({
      where: { userId: { in: ids } },
      include: {
        user: true,
        likes: { select: { userId: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts?.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No Posts found!"}
    </div>
  );
};

export default Feed;
