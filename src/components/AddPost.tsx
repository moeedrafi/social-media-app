"use client";

import Image from "next/image";

const AddPost = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        {/* AVATAR */}
        <div>
          <Image
            src="/noCover.png"
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* POST */}
        <div className="flex-1">
          {/* FORM */}
          <div className="flex gap-4">
            <textarea
              name="desc"
              placeholder="What's on your mind?"
              className="flex-1 p-2 bg-slate-100 rounded-lg"
            />

            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4 cursor-pointer self-end"
            />
            <button>Send</button>
          </div>

          {/* OPTIONS */}
          <div className="mt-4 flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addimage.png" alt="" width={20} height={20} />
              Photo
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addvideo.png" alt="" width={20} height={20} />
              Video
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/poll.png" alt="" width={20} height={20} />
              Poll
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src="/addevent.png" alt="" width={20} height={20} />
              Event
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
