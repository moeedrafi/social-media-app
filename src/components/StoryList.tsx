"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { addStory, addStoryVisiblity, seenStory } from "@/lib/actions";
import {
  Follower,
  Story,
  StoryViews,
  StoryVisibility,
  User,
} from "@prisma/client";
import { useOptimistic, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import StoryView from "./StoryView";
import StoryVisible from "./StoryVisible";

type StoryWithUser = Story & {
  user: User;
  storyViews: StoryViews[];
  storyVisibility: StoryVisibility[];
};
interface StoryListProps {
  stories: StoryWithUser[];
  followers: (Follower & { follower: User })[];
  userId: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

const StoryList = ({ stories, userId, followers }: StoryListProps) => {
  const [storyList, setStoryList] = useState(stories);
  const [isStoryView, setIsStoryView] = useState<boolean>(false);
  const [isStoryVisible, setIsStoryVisible] = useState<boolean>(false);
  const [visibleUsers, setVisibleUsers] = useState<string[]>([]);
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
      storyViews: [],
      storyVisibility: [],
    });
    try {
      const createdStory = await addStory(img.secure_url);

      if (visibleUsers.length > 0) {
        await addStoryVisiblity(createdStory.id, visibleUsers);
      }
      const story: StoryWithUser = {
        ...createdStory,
        storyViews: [],
        storyVisibility: [],
      };
      setStoryList((prev) => [story, ...prev]);
      setImg(null);
      setVisibleUsers([]);
    } catch (error) {
      console.log(error);
    }
  };

  const userStories = optimisticStories.filter(
    (story) => story.userId === userId
  );
  const otherStories = optimisticStories.filter(
    (story) => story.userId !== userId
  );
  const sortedStories = [...userStories, ...otherStories];

  const [activeStoryUser, setActiveStoryUser] = useState<StoryWithUser | null>(
    null
  );
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const openStoryViewer = async (story: StoryWithUser) => {
    try {
      setIsStoryView(true);
      setActiveStoryUser(story);
      setCurrentStoryIndex(sortedStories.findIndex((s) => s.id === story.id));

      if (story.user.id !== userId) {
        await seenStory(story.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const nextStory = () => {
    if (currentStoryIndex < sortedStories.length - 1) {
      const nextIndex = currentStoryIndex + 1;
      setCurrentStoryIndex(nextIndex);
      setActiveStoryUser(sortedStories[nextIndex]);
    } else {
      setIsStoryView(false);
    }
  };
  const prevStory = () => {
    if (activeStoryUser && activeStoryUser.userId === userId) {
      setIsStoryView(false);
    } else if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1;
      setCurrentStoryIndex(prevIndex);
      setActiveStoryUser(sortedStories[prevIndex]);
    } else {
      setIsStoryView(false);
    }
  };

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
                <>
                  <form action={add}>
                    <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                      Send
                    </button>
                  </form>
                  <button
                    onClick={() => setIsStoryVisible(true)}
                    className="text-xs bg-blue-500 p-1 rounded-md text-white"
                  >
                    Close Friends
                  </button>
                </>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      {sortedStories.map((story) => {
        const hasViewed = story.storyViews.some(
          (view) => view.viewerId === userId
        );

        const isVisible =
          story.userId === userId ||
          story.storyVisibility.some((visible) => visible.userId === userId);

        return (
          <div
            key={story.id}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            {isVisible && (
              <>
                <Image
                  src={story.user.avatar || "/noAvatar.png"}
                  alt="avatar"
                  width={80}
                  height={80}
                  className={`w-20 h-20 rounded-full ring-2 ${
                    hasViewed ? "ring-transparent" : "ring-blue-500"
                  }`}
                  onClick={() => openStoryViewer(story)}
                />
                <span className="font-medium">
                  {story.user.name || story.user.username}
                </span>
              </>
            )}
          </div>
        );
      })}

      {isStoryView && activeStoryUser && (
        <StoryView
          isFirstStory={currentStoryIndex === 0}
          isLastStory={currentStoryIndex === sortedStories.length - 1}
          nextStory={nextStory}
          prevStory={prevStory}
          userStory={activeStoryUser}
          setIsStoryView={setIsStoryView}
          isOwnStory={activeStoryUser.userId === userId}
        />
      )}

      {isStoryVisible && (
        <StoryVisible
          followers={followers}
          setIsOpen={setIsStoryVisible}
          selectedUsers={visibleUsers}
          setSelectedUsers={setVisibleUsers}
        />
      )}
    </>
  );
};

export default StoryList;
