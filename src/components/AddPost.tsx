"use client";

import Image from "next/image";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addPost } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<CloudinaryUploadResult | null>(null);

  if (!isLoaded) return "Loading...";

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        {/* AVATAR */}
        <div>
          <Image
            src={user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* POST */}
        <div className="flex-1">
          {/* FORM */}
          <form
            action={(formData) => {
              addPost(formData, img?.secure_url || "");
              setImg(null);
            }}
            className="flex gap-4"
          >
            <textarea
              name="desc"
              placeholder="What's on your mind?"
              onChange={(e) => setDesc(e.target.value)}
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
          </form>

          {/* OPTIONS */}
          <div className="mt-4 flex items-center gap-4 text-gray-400">
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result, { widget }) => {
                const info = result.info as CloudinaryUploadResult;
                setImg(info);
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Image src="/addimage.png" alt="" width={20} height={20} />
                    Photo
                  </div>
                );
              }}
            </CldUploadWidget>
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

          {img && (
            <div className="relative mt-5 p-2 bg-gray-100 rounded-lg shadow-md w-40">
              <Image src={img.secure_url} alt="img" width={160} height={160} />
              <button
                onClick={() => setImg(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
              >
                ✖
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
