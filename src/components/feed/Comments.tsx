"use client";

import Image from "next/image";
import { useState } from "react";
import Avatar from "../Avatar";
import CommentInput from "./CommentInput";

interface CommentsProps {
  username: string;
  text: string;
  avatar: string;
  isReply?: boolean;
}

const Comments = ({
  avatar,
  text,
  username,
  isReply = false,
}: CommentsProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <div className="flex gap-4 justify-between mt-6">
      <Avatar src={avatar} alt="avatar" size={40} className="w-10 h-10" />

      <div className="flex flex-col gap-2 flex-1">
        <span className="font-medium">{username}</span>
        <p>{text}</p>

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

          {!isReply && (
            <button onClick={() => setIsReplying((prev) => !prev)}>
              Reply
            </button>
          )}
        </div>

        {isReplying && <CommentInput placeholder="Write a Reply..." />}

        {!isReply && (
          <button
            className="mt-2 self-start text-blue-500 font-medium"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            {showReplies ? "Hide Reply" : "Show Reply"}
          </button>
        )}

        {showReplies && !isReply && (
          <Comments
            username="morafi"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaec"
            avatar="/noAvatar.png"
            isReply={true}
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
  );
};

export default Comments;
