"use client";

import Image from "next/image";
import { AuthTabs } from "@/features/auth/components/auth-tabs";

export const AuthForm = () => {
  return (
    <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-white text-black">
      <div className="w-full h-full flex flex-col items-center justify-center p-3 space-y-5">
        <div className="flex items-center space-x-3">
          <Image src={"/logo.svg"} alt="logo" width={27} height={27} />
          <span className="text-lg font-semibold">Recipify</span>
        </div>
        <span className="text-sm text-neutral-700 font-medium text-center">
          A platform to add or pick amazing recipes all around world.
        </span>
        <AuthTabs />
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
