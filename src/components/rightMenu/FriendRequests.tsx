import Link from "next/link";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import FriendRequestsList from "@/components/rightMenu/FriendRequestsList";

const FriendRequests = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: { receiverId: userId },
    include: { sender: true },
  });

  if (requests.length === 0) return null;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <FriendRequestsList requests={requests} />
    </div>
  );
};

export default FriendRequests;
