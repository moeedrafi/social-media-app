import Ad from "@/components/Ad";
import UserInfo from "@/components/rightMenu/UserInfo";
import UserMedia from "@/components/rightMenu/UserMedia";
import Birthdays from "@/components/rightMenu/Birthdays";
import FriendRequests from "@/components/rightMenu/FriendRequests";
import { User } from "@prisma/client";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user && (
        <>
          <UserInfo user={user} />
          <UserMedia user={user} />
        </>
      )}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
