import Feed from "@/components/feed/Feed";
import AddPost from "@/components/AddPost";
import Stories from "@/components/Stories";
import RightMenu from "@/components/rightMenu/RightMenu";

export default function Home() {
  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT */}
      <div className="hidden xl:block w-[20%]">Left</div>

      {/* CENTER */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
