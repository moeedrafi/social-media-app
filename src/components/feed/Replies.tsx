"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Avatar from "@/components/Avatar";
import { addReply } from "@/lib/actions";
import { Comment, User } from "@prisma/client";
import { useOptimistic, useState } from "react";

type ReplyWithUser = Comment & { user: User };
interface CommentInputProps {
  postId: number;
  commentId: number;
  replies: ReplyWithUser[];
}

const CommentInput = ({ commentId, postId, replies }: CommentInputProps) => {
  const { user } = useUser();
  const [desc, setDesc] = useState("");
  const [replyState, setReplyState] = useState<ReplyWithUser[]>(replies);
  const [optimisticReply, addOptimisticReply] = useOptimistic(
    replyState,
    (state, value: ReplyWithUser) => [...state, value]
  );

  const add = async () => {
    if (!user || !desc) return;
    addOptimisticReply({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      parentId: commentId,
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
    });
    try {
      const createdReply = await addReply(postId, commentId, desc);
      if (createdReply) {
        setReplyState((prev) => [...prev, createdReply]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-5">
      <div className="flex items-center gap-4 mt-4">
        <Avatar src="/noCover.png" alt="" size={32} className="h-8 w-8" />

        <form
          action={add}
          className="flex-1 flex items-center justify-between text-sm px-6 py-2 bg-slate-100 rounded-xl"
        >
          <input
            type="text"
            placeholder="Write a Reply..."
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

      <div>
        {optimisticReply.map((reply) => (
          <div key={reply.id} className="flex gap-4 justify-between mt-6">
            <Avatar
              src={reply.user.avatar || "/noAvatar.png"}
              alt="avatar"
              size={40}
              className="w-10 h-10"
            />

            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {reply.user.name && reply.user.surname
                  ? reply.user.name + " " + reply.user.surname
                  : reply.user.username}
              </span>
              <p>{reply.desc}</p>

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
                  <span>0 Likes</span>
                </div>
              </div>
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
    </div>
  );
};

export default CommentInput;
