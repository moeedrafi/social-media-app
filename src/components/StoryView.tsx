"use client";

import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { Story, StoryViews, User } from "@prisma/client";
import StorySeen from "@/components/StorySeen";

type StoryWithUser = Story & { user: User; storyViews: StoryViews[] };
interface StoryViewProps {
  userStory: StoryWithUser;
  isOwnStory: boolean;
  isFirstStory: boolean;
  isLastStory: boolean;
  nextStory: () => void;
  prevStory: () => void;
  setIsStoryView: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoryView = ({
  userStory,
  setIsStoryView,
  nextStory,
  prevStory,
  isOwnStory,
  isFirstStory,
  isLastStory,
}: StoryViewProps) => {
  return (
    <div className="absolute top-0 right-0 w-full h-screen bg-slate-300 bg-opacity-50 flex flex-col items-center justify-center gap-2 z-30">
      {!isOwnStory && (
        <ProgressBar duration={5000} onComplete={() => setIsStoryView(false)} />
      )}

      <button
        onClick={() => setIsStoryView(false)}
        className="absolute top-3 right-5 text-xl font-semibold"
      >
        X
      </button>

      <div className="flex items-center gap-10">
        <button
          onClick={prevStory}
          disabled={isOwnStory || isFirstStory}
          className="bg-blue-500 text-white p-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <div className="bg-gray-400 p-5">
          <Image
            src={userStory.img}
            alt="story"
            width={384}
            height={384}
            className="w-full h-[90%] rounded-lg"
          />
        </div>
        <button
          onClick={nextStory}
          disabled={isLastStory}
          className="bg-blue-500 text-white p-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isOwnStory && <StorySeen story={userStory} />}
    </div>
  );
};

export default StoryView;
