import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT - LOGO */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="text-xl text-blue-500 font-bold">
          SOCIAL
        </Link>
      </div>

      {/* CENTER */}
      <div className="w-[55%] hidden md:flex text-sm items-center justify-between">
        {/* NAVLINKS */}
        <div className="flex text-gray-600 gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/home.png" alt="homeIcon" width={16} height={16} />
            <span>HomePage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/friends.png" alt="homeIcon" width={16} height={16} />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/stories.png" alt="homeIcon" width={16} height={16} />
            <span>Stories</span>
          </Link>
        </div>

        {/* Search */}
        <div className="hidden xl:flex items-center bg-slate-100 rounded-xl p-2">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="search" width={14} height={14} />
        </div>
      </div>

      {/* RIGHT - LOGIN */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <div className="flex items-center gap-2">
          <Image src="/login.png" alt="" width={24} height={24} />
          <Link href="/">Login/Register</Link>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
