"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  SigninForm,
  SigninFormValues,
} from "@/features/auth/components/signin-form";

import { useSignin } from "@/features/auth/api/use-signin";
import Link from "next/link";
import { HeaderLogo } from "@/components/header/header-logo";

const LoginModal = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignin();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="text-black">
        <DialogTitle></DialogTitle>
        <div className="w-full flex items-center justify-center">
          <HeaderLogo />
        </div>
        <SigninForm
          disabled={isPending}
          onSubmit={(values: SigninFormValues) => {
            mutate(values);
          }}
        />
        <button onClick={() => window.location.replace("/login")}>
          Dont Have Account? Signup
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
