"use client";

import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  SigninForm,
  SigninFormValues,
} from "@/features/auth/components/signin-form";
import {
  SignupForm,
  SignupFormValues,
} from "@/features/auth/components/signup-form";

import { useSignin } from "@/features/auth/api/use-signin";
import { useSignup } from "../api/use-signup";

export const AuthForm = () => {
  const { mutate: signinMutation, isPending: signinPending } = useSignin();
  const { mutate: signupMutation, isPending: signupPending } = useSignup();

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
        <Tabs className="w-96" defaultValue="sign-in">
          <TabsList className="grid w-full grid-cols-2 h-fit p-1">
            <TabsTrigger value="sign-in" className="text-lg">
              Sign in
            </TabsTrigger>
            <TabsTrigger value="sign-up" className="text-lg">
              Sign up
            </TabsTrigger>
          </TabsList>

          <TabsContent className="w-96 min-h-[400px] h-fit" value="sign-in">
            <SigninForm
              disabled={signinPending}
              onSubmit={(values: SigninFormValues) => {
                signinMutation(values);
              }}
            />
          </TabsContent>
          <TabsContent className="w-96 min-h-[400px] h-fit" value="sign-up">
            <SignupForm
              disabled={signupPending}
              onSubmit={(formValues: SignupFormValues) => {
                signupMutation(formValues);
              }}
            />
          </TabsContent>
        </Tabs>
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
