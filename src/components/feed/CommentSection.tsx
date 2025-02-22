import Comments from "@/components/feed/Comments";
import CommentInput from "@/components/feed/CommentInput";

const CommentSection = () => {
  return (
    <div>
      {/* INPUT */}
      <CommentInput placeholder="Write a Comment..." />

      {/* COMMNTS */}
      <Comments
        username="moeedrafi"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        avatar="/noCover.png"
      />
    </div>
  );
};

export default CommentSection;
