"use client";

import Image from "next/image";
import { useState } from "react";
import { deletePost } from "@/lib/actions";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState<boolean>(false);

  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute top-4 right-0 p-4 w-32 bg-white rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Repost</span>
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
