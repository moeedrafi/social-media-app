import Ad from "@/components/Ad";
import Birthdays from "@/components/rightMenu/Birthdays";
import FriendRequests from "@/components/rightMenu/FriendRequests";

const RightMenu = () => {
  return (
    <div className="flex flex-col gap-6">
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
