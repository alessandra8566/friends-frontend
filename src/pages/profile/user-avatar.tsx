import { Separator } from "@/components/ui/separator";
import UserAvatarForm from "./components/user-avatar-form";

const UserAvatar = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">個人頭像</h3>
        <p className="text-sm text-muted-foreground">
          其他用戶將會看到這些頭像
        </p>
      </div>
      <Separator />
      <UserAvatarForm />
    </div>
  );
};

export default UserAvatar;
