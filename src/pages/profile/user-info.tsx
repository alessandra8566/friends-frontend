import { Separator } from "@/components/ui/separator";
import UserInfoForm from "./components/user-info-form";

const UserInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">個人資料</h3>
        <p className="text-sm text-muted-foreground">
          其他用戶將會看到這些資料
        </p>
      </div>
      <Separator />
      <UserInfoForm />
    </div>
  );
};

export default UserInfo;
