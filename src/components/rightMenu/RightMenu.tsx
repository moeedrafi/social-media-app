import Ad from "@/components/Ad";
import UserInfo from "@/components/rightMenu/UserInfo";
import UserMedia from "@/components/rightMenu/UserMedia";
import Birthdays from "@/components/rightMenu/Birthdays";
import FriendRequests from "@/components/rightMenu/FriendRequests";

const RightMenu = () => {
  return (
    <div className="flex flex-col gap-6">
      <UserInfo />
      <UserMedia />
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
