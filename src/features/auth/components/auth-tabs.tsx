"use client";

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

export const AuthTabs = () => {
  const { mutate: signinMutation, isPending: signinPending } = useSignin();
  const { mutate: signupMutation, isPending: signupPending } = useSignup();

  return (
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
          lightBorder={true}
          disabled={signinPending}
          onSubmit={(values: SigninFormValues) => {
            signinMutation(values);
          }}
        />
      </TabsContent>
      <TabsContent className="w-96 min-h-[400px] h-fit" value="sign-up">
        <SignupForm
          lightBorder={true}
          disabled={signupPending}
          onSubmit={(formValues: SignupFormValues) => {
            signupMutation(formValues);
          }}
        />
      </TabsContent>
    </Tabs>
  );
};
