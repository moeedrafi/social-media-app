import Image from "next/image";
import Avatar from "../Avatar";
import Link from "next/link";

const FriendRequests = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar src="/noCover.png" alt="" size={40} className="w-10 h-10" />
          <span className="font-semibold">John Doe</span>
        </div>

        <div className="flex gap-3 justify-end">
          <button>
            <Image
              src="/accept.png"
              alt="accept"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>

          <button>
            <Image
              src="/reject.png"
              alt="accept"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
