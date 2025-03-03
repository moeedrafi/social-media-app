"use client";

import { useOptimistic, useState } from "react";
import { switchBlock, switchFollow } from "@/lib/actions";

interface UserInfoInteractionProps {
  userId: string;
  isFollowing: boolean;
  isFollowingSent: boolean;
  isUserBlocked: boolean;
}

const UserInfoInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: UserInfoInteractionProps) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: false,
        followingRequestSent: !prev.following && !prev.followingRequestSent,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: false,
            followingRequestSent:
              !state.following && !state.followingRequestSent,
          }
        : { ...state, blocked: !state.blocked }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Follow Request Sent"
            : "Follow"}
        </button>
      </form>

      <form action={block} className="self-end">
        <button className="text-red-400 text-xs">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoInteraction;
