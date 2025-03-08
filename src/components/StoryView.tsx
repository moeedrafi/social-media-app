"use client";

import Image from "next/image";
import { Story } from "@prisma/client";
import ProgressBar from "./ProgressBar";

interface StoryViewProps {
  userStory: Story;
  setIsStoryView: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoryView = ({ userStory, setIsStoryView }: StoryViewProps) => {
  return (
    <div className="absolute top-0 right-0 w-full h-screen bg-slate-300 bg-opacity-50 flex flex-col items-center justify-center gap-2 z-30">
      <ProgressBar duration={5000} isActive={true} />

      <button
        onClick={() => setIsStoryView(false)}
        className="absolute top-3 right-5 text-xl font-semibold"
      >
        X
      </button>

      <div className="flex items-center gap-10">
        <button className="bg-blue-500 text-white p-2 rounded-lg">
          Previous
        </button>
        <div className="bg-gray-400 p-5">
          <Image
            src={userStory.img}
            alt="avatar"
            width={384}
            height={384}
            className="w-full h-[90%] rounded-lg"
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default StoryView;
