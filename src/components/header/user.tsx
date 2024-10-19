"use client";

import Link from "next/link";
import { Edit2, Loader2, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useUser } from "@/features/auth/api/use-user";
import { useLogout } from "@/features/auth/api/use-logout";

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
          variant={"ghost"}
          className="text-white hover:text-white hover:bg-white/10"
        >
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback className="text-black">
                {user.username.charAt(0)}
              </AvatarFallback>
              <AvatarImage src={user.avatar} alt={user.username} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Links</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Button
                  variant={"ghost"}
                  className="hover:cursor-pointer"
                  asChild
                >
                  <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-400" />
            <DropdownMenuLabel>User</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Button
                  asChild
                  className="w-full hover:cursor-pointer"
                  variant={"ghost"}
                >
                  <Link href={"/edit-profile"} className="">
                    <Edit2 className="size-4" />
                    <span>Edit</span>
                  </Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-400" />
              <DropdownMenuItem asChild>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    logout();
                  }}
                  className="w-full  hover:cursor-pointer"
                  variant={"ghost"}
                >
                  <LogOut className="size-4" />
                  <span>LogOut</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
