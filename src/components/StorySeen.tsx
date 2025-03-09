"use client";

import { Story, StoryViews, User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type StoryWithUser = Story & {
  user: User;
  storyViews: (StoryViews & { viewer: User })[];
};

const StorySeen = ({ story }: { story: StoryWithUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredViewers = story.storyViews.filter(
    (view) => view.viewerId !== story.user.id
  );

  return (
    <div>
      <div
        className={`${
          isOpen && "hidden"
        } p-4 bg-blue-500 rounded-lg text-white`}
      >
        <button className="font-semibold" onClick={() => setIsOpen(true)}>
          Check Seen
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-0 right-0 w-full h-screen bg-slate-300 bg-opacity-50 flex flex-col items-center justify-center gap-2 z-30">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-5 text-xl font-semibold"
          >
            X
          </button>

          <div className="bg-blue-500 mx-10 p-4 rounded-lg shadow-md flex items-center flex-wrap gap-5">
            {filteredViewers.length > 0
              ? filteredViewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center gap-2">
                    <Image
                      src={viewer.viewer.avatar!}
                      alt="story"
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover ring-1"
                    />
                    <span className="text-white">{viewer.viewer.username}</span>
                  </div>
                ))
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default StorySeen;
