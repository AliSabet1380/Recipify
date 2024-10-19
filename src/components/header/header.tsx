import { HeaderLogo } from "@/components/header/header-logo";
import { Navigation } from "@/components/header/navigation";
import { MobileNavigation } from "@/components/header/mobile-navigation";
import { User } from "@/components/header/user";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/80 backdrop-blur transition will-change-auto block">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="flex items-center justify-between border-b border-b-white/5 py-5 ">
          <HeaderLogo />
          <div className="flex flex-row-reverse lg:flex-row items-center gap-x-2 lg:space-x-10 ">
            <MobileNavigation />
            <Navigation />
            <User />
          </div>
        </div>
      </div>
    </header>
  );
};
