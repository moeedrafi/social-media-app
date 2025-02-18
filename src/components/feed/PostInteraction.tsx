import Image from "next/image";

const PostInteraction = () => {
  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="p-2 flex items-center gap-4 rounded-xl bg-slate-100">
          <Image src="/like.png" alt="like" width={16} height={16} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            0<span className="hidden md:inline">Likes</span>
          </span>
        </div>

        <div className="p-2 flex items-center gap-4 rounded-xl bg-slate-100">
          <Image src="/comment.png" alt="comment" width={16} height={16} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            0<span className="hidden md:inline">Comments</span>
          </span>
        </div>
      </div>

      <div>
        <div className="p-2 flex items-center gap-4 rounded-xl bg-slate-100">
          <Image src="/share.png" alt="share" width={16} height={16} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
