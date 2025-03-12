import prisma from "@/lib/client";

import Comments from "@/components/feed/Comments";

const CommentSection = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      user: true,
      replies: { include: { user: true } },
      _count: { select: { likes: true } },
    },
  });

  return (
    <div>
      <Comments comments={comments} postId={postId} />
    </div>
  );
};

export default CommentSection;
