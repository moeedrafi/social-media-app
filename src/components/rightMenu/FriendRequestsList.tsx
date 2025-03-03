import Image from "next/image";

import Avatar from "@/components/Avatar";

const FriendRequestsList = () => {
  return (
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
  );
};

export default FriendRequestsList;
