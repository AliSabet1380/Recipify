"use client";

import Link from "next/link";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(3).max(25),
});

export type SigninFormValues = z.infer<typeof FormSchema>;

interface SigninFormProps {
  onSubmit: (values: SigninFormValues) => void;
  disabled?: boolean;
  lightBorder?: boolean;
}

export const SigninForm = ({
  onSubmit,
  disabled,
  lightBorder,
}: SigninFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(FormSchema),
    disabled,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-col space-y-7 p-5 w-full h-full border-2 ${
          lightBorder ? "border-zinc-100" : "border-zinc-300"
        } shadow-lg rounded-lg`}
      >
        <h2 className="text-xl font-semibold">Sign in</h2>
        <div className="w-full flex flex-col items-center  space-y-3 ">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-1 border rounded-md">
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className=""
                    />
                    <Button
                      onClick={() => setShowPassword((pervState) => !pervState)}
                      type="button"
                      size={"icon"}
                      variant={"ghost"}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Link
          href={"/forget-password"}
          className="text-sm self-start font-medium "
        >
          Forget your password ?
        </Link>

        <Button className="w-full" disabled={disabled}>
          Sign in
        </Button>
      </form>
    </Form>
  );
};
