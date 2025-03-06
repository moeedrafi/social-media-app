"use client";

import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { switchLike } from "@/lib/actions";
import { useOptimistic, useState } from "react";

interface PostInteractionProps {
  postId: number;
  likes: string[];
  commentNumber: number;
}

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: PostInteractionProps) => {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      await switchLike(postId);
      setLikeState((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="p-2 flex items-center gap-4 rounded-xl bg-slate-100">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt="like"
                width={16}
                height={16}
              />
            </button>
          </form>

          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline">Likes</span>
          </span>
        </div>

        <div className="p-2 flex items-center gap-4 rounded-xl bg-slate-100">
          <Image src="/comment.png" alt="comment" width={16} height={16} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber}
            <span className="hidden md:inline">Comments</span>
          </span>
        </div>
      </div>

      <div>
        <div className="p-2 flex items-center gap-4 rounded-xl bg-slate-100">
          <Image src="/share.png" alt="share" width={16} height={16} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
