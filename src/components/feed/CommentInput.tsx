import Image from "next/image";
import Avatar from "@/components/Avatar";

const CommentInput = () => {
  return (
    <div className="flex items-center gap-4 mt-4">
      <Avatar src="/noCover.png" alt="" size={32} className="h-8 w-8" />

      <form className="flex-1 flex items-center justify-between text-sm px-6 py-2 bg-slate-100 rounded-xl">
        <input
          type="text"
          placeholder="Write a Comment..."
          className="flex-1 bg-transparent outline-none"
        />
        <Image
          src="/emoji.png"
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
      </form>
    </div>
  );
};

export default CommentInput;
