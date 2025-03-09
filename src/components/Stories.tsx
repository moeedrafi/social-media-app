import prisma from "@/lib/client";
import StoryList from "@/components/StoryList";
import { auth } from "@clerk/nextjs/server";

const Stories = async () => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: { gt: new Date() },
      OR: [
        { user: { followings: { some: { followingId: currentUserId } } } },
        { userId: currentUserId },
      ],
    },
    include: { user: true, storyViews: { include: { viewer: true } } },
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide ">
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
