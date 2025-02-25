import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <h1 className="text-xl text-black">John Doe</h1>
          <span className="text-sm">@john</span>
        </div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="map" width={16} height={16} />
          <span>Living in London</span>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="school" width={16} height={16} />
          <span>Went to Harvard</span>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="work" width={16} height={16} />
          <span>Works at Netflix</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image src="/link.png" alt="link" width={16} height={16} />
            <Link href="/" className="text-blue-500 font-medium text-xs">
              moeed.dev
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Image src="/date.png" alt="date" width={20} height={20} />
            <span className="text-gray-400 text-xs">
              Joined Feburary 5, 2025
            </span>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          Follow
        </button>

        <button className="text-red-400 text-xs self-end">Block</button>
      </div>
    </div>
  );
};

export default UserInfo;
