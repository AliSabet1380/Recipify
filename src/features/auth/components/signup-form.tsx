"use client";

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
  username: z.string().trim().min(3).max(25),
  password: z.string().trim().min(3).max(25),
});

export type SignupFormValues = z.infer<typeof FormSchema>;

interface SigninFormProps {
  onSubmit: (values: SignupFormValues) => void;
  disabled?: boolean;
}

export const SignupForm = ({ onSubmit, disabled }: SigninFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(FormSchema),
    disabled,
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-7 p-5 w-full h-full border-2 border-zinc-100 shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-semibold">Sign up</h2>
        <div className="w-full flex flex-col items-center space-y-3">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} className="border" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

        <Button className="w-full" disabled={disabled}>
          Sign up
        </Button>
      </form>
    </Form>
  );
};
