"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { addStory } from "@/lib/actions";
import { Story, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

type StoryWithUser = Story & { user: User };
interface StoryListProps {
  stories: StoryWithUser[];
  userId: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

const StoryList = ({ stories, userId }: StoryListProps) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<CloudinaryUploadResult | null>(null);

  const { user } = useUser();

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!img?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now()),
      userId: userId,
      user: {
        id: userId,
        username: "Sending...",
        avatar: user?.imageUrl || "/noAvatar.png",
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
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const userStories = optimisticStories.filter(
    (story) => story.userId === user?.id
  );
  const otherStories = optimisticStories.filter(
    (story) => story.userId !== user?.id
  );

  return (
    <>
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
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <Image
                src={img?.secure_url || "/noAvatar.png"}
                alt="avatar"
                width={80}
                height={80}
                onClick={() => open()}
                className="w-20 h-20 rounded-full ring-2"
              />
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      {userStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt="avatar"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}

      {otherStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt="avatar"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
