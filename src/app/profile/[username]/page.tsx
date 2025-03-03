import Image from "next/image";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      _count: { select: { post: true, followers: true, followings: true } },
    },
  });

  if (!user) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            {/* IMAGES */}
            <div className="w-full h-64 relative">
              <Image
                src="/noCover.png"
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src="/noCover.png"
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover absolute -bottom-16 right-0 left-0 m-auto ring-4 ring-white"
              />
            </div>

            <h1 className="mt-20 mb-4 text-2xl font-medium">John Doe</h1>

            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">1</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">1</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">1</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>

          <Feed username={username} />
        </div>
      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
