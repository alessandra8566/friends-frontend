import { Icons } from "@/components/icons";

function NoMatch() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center text-3xl">
      <Icons.notfound className="w-48"/>
      查無此頁
    </div>
  );
}

export default NoMatch;
