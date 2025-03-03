import Link from "next/link";
import FriendRequestsList from "@/components/rightMenu/FriendRequestsList";

const FriendRequests = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <FriendRequestsList />
    </div>
  );
};

export default FriendRequests;
