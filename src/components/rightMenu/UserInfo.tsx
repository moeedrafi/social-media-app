import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/client";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

import UpdateUser from "@/components/rightMenu/UpdateUser";
import UserInfoInteraction from "@/components/rightMenu/UserInfoInteraction";

const UserInfo = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { userId: currentUserId } = await auth();

  let isFollowing = false;
  let isFollowingSent = false;
  let isUserBlocked = false;

  if (currentUserId) {
    const [blockRes, followRes, followReqRes] = await Promise.all([
      await prisma.block.findFirst({
        where: { blockerId: currentUserId, blockedId: user.id },
      }),
      await prisma.follower.findFirst({
        where: { followingId: currentUserId, followerId: user.id },
      }),
      await prisma.followRequest.findFirst({
        where: { senderId: currentUserId, receiverId: user.id },
      }),
    ]);

    isFollowing = !!followRes;
    isUserBlocked = !!blockRes;
    isFollowingSent = !!followReqRes;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <h1 className="text-xl text-black">
            {user.name ? user.name + " " + user.surname : user.username}
          </h1>
          <span className="text-sm">@{user.username}</span>
        </div>

        {user.description && <p>{user.description}</p>}

        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="map" width={16} height={16} />
            <span>Living in {user.city}</span>
          </div>
        )}

        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="school" width={16} height={16} />
            <span>Went to {user.school}</span>
          </div>
        )}

        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="work" width={16} height={16} />
            <span>Works at {user.work}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex items-center gap-1">
              <Image src="/link.png" alt="link" width={16} height={16} />
              <Link
                href={user.website}
                className="text-blue-500 font-medium text-xs"
              >
                {user.website}
              </Link>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Image src="/date.png" alt="date" width={20} height={20} />
            <span className="text-gray-400 text-xs">
              Joined {formattedDate}
            </span>
          </div>
        </div>

        {currentUserId && currentUserId !== user.id && (
          <UserInfoInteraction
            userId={user.id}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
            isUserBlocked={isUserBlocked}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
