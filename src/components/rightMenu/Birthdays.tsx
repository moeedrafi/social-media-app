import Image from "next/image";
import Avatar from "../Avatar";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>

      <div className="flex items-center justify-between">
        {/* AVATAR */}
        <div className="flex items-center gap-4">
          <Avatar
            src="/noCover.png"
            alt=""
            size={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-semibold">John Doe</span>
        </div>

        <div className="flex gap-3 justify-end">
          <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md">
            Celebrate
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-slate-100 rounded-lg">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 16 have upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
