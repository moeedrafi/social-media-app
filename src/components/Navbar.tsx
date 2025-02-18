import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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
        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="" width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2">
              <Image src="/login.png" alt="" width={24} height={24} />
              <Link href="/">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>

        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
