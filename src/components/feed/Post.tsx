import Image from "next/image";
import Comments from "@/components/feed/Comments";
import PostInteraction from "@/components/feed/PostInteraction";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER INFO */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/noCover.png"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">moeedrafi</span>
        </div>
        <Image
          src="/more.png"
          width={16}
          height={16}
          alt=""
          className="cursor-pointer"
        />
      </div>

      {/* DSEC */}
      <div className="flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum
          iste accusantium ipsum, deserunt neque eligendi dignissimos enim
          aspernatur! Harum laboriosam odit exercitationem odio nihil aut dicta
          atque, cupiditate molestiae.
        </p>
        <div className="w-full min-h-96 relative">
          <Image
            src="/noCover.png"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* POST INTERACTION */}
      <PostInteraction />

      {/* COMMENTS */}
      <Comments />
    </div>
  );
};

export default Post;
