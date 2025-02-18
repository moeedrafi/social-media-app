"use client";

import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="md:hidden">
      <button
        className="flex flex-col gap-[4.5px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`bg-blue-500 w-6 h-1 rounded-sm origin-left ${
            isOpen && "rotate-45"
          } ease-in-out duration-500 `}
        />
        <div
          className={`bg-blue-500 w-6 h-1 rounded-sm ${
            isOpen && "opacity-0"
          } ease-in-out duration-500`}
        />
        <div
          className={`bg-blue-500 w-6 h-1 rounded-sm origin-left ${
            isOpen && "-rotate-45"
          } ease-in-out duration-500`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-24 w-full bg-white h-[calc(100vh-96px)] flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/">Friends</Link>
          <Link href="/">Groups</Link>
          <Link href="/">Stories</Link>
          <Link href="/">Login</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
