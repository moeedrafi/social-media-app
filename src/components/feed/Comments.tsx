"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { useOptimistic, useState } from "react";

import Avatar from "@/components/Avatar";
import { addComment } from "@/lib/actions";
import Replies from "@/components/feed/Replies";

type CommentWithUser = Comment & {
  user: User;
  replies: Array<Comment & { user: User }>;
  _count: { likes: number };
};
interface CommentsProps {
  postId: number;
  comments: CommentWithUser[];
}

const Comments = ({ comments, postId }: CommentsProps) => {
  const { user } = useUser();
  const [desc, setDesc] = useState("");
  const [commentState, setCommentState] = useState(comments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!user || !desc) return;
    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
      parentId: null,
      _count: { likes: 0 },
      replies: [],
    });

    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [
        { ...createdComment, _count: { likes: 0 }, replies: [] },
        ...prev,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-4 mt-4">
          <Avatar src="/noCover.png" alt="" size={32} className="h-8 w-8" />
          <form
            action={add}
            className="flex-1 flex items-center justify-between text-sm px-6 py-2 bg-slate-100 rounded-xl"
          >
            <input
              type="text"
              placeholder="Write a Comment..."
              onChange={(e) => setDesc(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </form>
        </div>
      )}

      <div>
        {optimisticComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 justify-between mt-6">
            <Avatar
              src={comment.user.avatar || "/noAvatar.png"}
              alt="avatar"
              size={40}
              className="w-10 h-10"
            />

            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>

              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt="like"
                    width={12}
                    height={12}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-300">|</span>
                  <span>{comment._count.likes} Likes</span>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/comment.png"
                    alt="comment"
                    width={12}
                    height={12}
                    className="w-4 h-4 cursor-pointer"
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                  />
                  <span className="text-gray-300">|</span>
                  <span>{comment.replies.length} Replies</span>
                </div>
              </div>

              {replyingTo === comment.id && (
                <Replies
                  postId={postId}
                  commentId={comment.id}
                  replies={comment.replies}
                />
              )}
            </div>

            <Image
              src="/more.png"
              width={16}
              height={16}
              alt=""
              className="w-4 h-4 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
