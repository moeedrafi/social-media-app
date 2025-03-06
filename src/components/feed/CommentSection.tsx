import prisma from "@/lib/client";

import Comments from "@/components/feed/Comments";

const CommentSection = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
  });

  return (
    <div>
      <Comments comments={comments} postId={postId} />
    </div>
  );
};

export default CommentSection;
