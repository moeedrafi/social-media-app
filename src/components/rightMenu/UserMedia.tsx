import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/client";
import { User } from "@prisma/client";

const UserMedia = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: { userId: user.id, img: { not: null } },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        {postsWithMedia.length ? (
          postsWithMedia.map((post) => (
            <div key={post.id} className="relative h-24 w-1/5">
              <Image
                src={post.img || "/noCover.png"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <div>No Media Found!</div>
        )}
      </div>
    </div>
  );
};

export default UserMedia;
