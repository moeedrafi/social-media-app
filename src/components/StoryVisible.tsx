"use client";

import Image from "next/image";
import { useState } from "react";
import { Follower, User } from "@prisma/client";

interface StoryVisibleProps {
  followers: (Follower & { follower: User })[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const StoryVisible = ({
  setIsOpen,
  followers,
  selectedUsers,
  setSelectedUsers,
}: StoryVisibleProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [userId, ...prev]
    );
  };

  const filteredFollowers = followers.filter((follower) =>
    follower.follower.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="absolute top-0 right-0 w-full h-screen bg-slate-200 bg-opacity-50 flex items-center justify-center z-30">
        <div className="relative p-4 w-96 bg-white rounded-lg shadow-md flex flex-col gap-5">
          <h1 className="text-xl font-bold">Users who will see Story</h1>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-100 rounded-lg p-2 outline-sky-200"
          />

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-medium">Followers List</h4>
            {filteredFollowers.length > 0 ? (
              filteredFollowers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center justify-between"
                  onClick={() => toggleUserSelection(follower.follower.id)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={follower.follower.avatar || "/noAvatar.png"}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{follower.follower.username}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedUsers.includes(follower.follower.id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }`}
                  />
                </div>
              ))
            ) : (
              <p>No Users Found!</p>
            )}
          </div>

          <button
            className="absolute right-5 font-bold"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default StoryVisible;
