"use client";

import { HeaderLogo } from "@/components/header/header-logo";
import { Loading } from "@/components/ui-pages/loading";
import { NotFoundPage } from "@/components/ui-pages/not-found";

import { useUser } from "@/features/auth/api/use-user";
import { EditProfilePage } from "@/features/profile/components/edit-profile-form";

const Profile = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (!user) return <NotFoundPage />;

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-white polka-dot">
      <div className="w-full h-full flex flex-col items-center justify-center text-black space-y-1">
        <HeaderLogo />
        <span className="text-sm text-neutral-700">
          You can edit your profile here
        </span>
        <div className="w-[400px] lg:w-[500px]">
          <EditProfilePage user={user} />
        </div>
      </div>

      <div className="w-full h-full hidden lg:flex items-center justify-center bg-zinc-800">
        <span
          draggable={false}
          className="bg-[linear-gradient(142deg,rgba(255,255,255,0.03)_5.7%,rgba(255,255,255,0.01)_86.54%)] bg-clip-text text-center text-[210px] font-bold leading-[150px] text-transparent select-none"
        >
          Ready To Go
        </span>
      </div>
    </div>
  );
};

export default Profile;
