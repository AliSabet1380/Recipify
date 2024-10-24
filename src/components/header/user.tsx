"use client";

import Link from "next/link";
import { Edit, Loader2, LogOut, AppWindow, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useUser } from "@/features/auth/api/use-user";
import { useLogout } from "@/features/auth/api/use-logout";
import Image from "next/image";

interface UserProps {
  loaderColor?: "white" | "black";
}

export const User = ({ loaderColor = "white" }: UserProps) => {
  const { mutate: logout, isPending } = useLogout();
  const { data: user, isLoading } = useUser();

  if (isLoading)
    return <Loader2 className={`size-4 text-${loaderColor} animate-spin`} />;

  return (
    <>
      {!user && (
        <Button
          asChild
          variant={"ghost"}
          className="text-white hover:text-white hover:bg-white/10"
        >
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-gray-200 text-black">
                {user.username.charAt(0)}
              </AvatarFallback>
              <AvatarImage src={user.avatar} alt={user.username} />
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={"/edit-profile"}
                  className="w-full flex items-center justify-between"
                >
                  <p>Profile</p>
                  <DropdownMenuShortcut>
                    <Edit />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/${user.id}`}
                  className="w-full flex items-center justify-between"
                >
                  <p>Dashboard</p>
                  <DropdownMenuShortcut>
                    <AppWindow />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Settings
                <DropdownMenuShortcut>
                  <Settings />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"https://github.com/AliSabet1380"}>Github</Link>
              <DropdownMenuShortcut>
                <Image
                  src="/github-black.svg"
                  alt="github"
                  width={15}
                  height={15}
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              LinkedIn
              <DropdownMenuShortcut>
                <Image
                  src={"/linkedin.svg"}
                  alt="github"
                  width={15}
                  height={15}
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Twitter
              <DropdownMenuShortcut>
                <Image
                  src={"/twitter.svg"}
                  alt="github"
                  width={15}
                  height={15}
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              Log out
              <DropdownMenuShortcut>
                <LogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
