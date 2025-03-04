"use client";

import Image from "next/image";
import { useOptimistic, useState } from "react";
import { FollowRequest, User } from "@prisma/client";

import Avatar from "@/components/Avatar";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestsList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);
  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {optimisticRequest.map((request) => (
        <div key={request.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              size={40}
              className="w-10 h-10"
            />
            <span className="font-semibold">{request.sender.username}</span>
          </div>

          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt="accept"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>

            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt="accept"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestsList;
