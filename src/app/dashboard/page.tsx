"use client";
import { BellRing, Loader2, Settings } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { User } from "@/components/header/user";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { NewItem } from "@/components/dashboard/new-item";

import { useUser } from "@/features/auth/api/use-user";
import Image from "next/image";

const dummyData = [
  {
    title: "Something",
    desc: "Something else",
    coverImg: "/logo.svg",
  },
  {
    title: "Something",
    desc: "Something else",
    coverImg: "/logo.svg",
  },
  {
    title: "Salad Bar",
    desc: "a full healthy salad that you can create with so simple ing in your kichen",
    coverImg: "/landing-1.png",
  },
];

const Dashboard = () => {
  const { data: user, isLoading } = useUser();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center space-x-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex items-center space-x-5">
            <Settings className="size-4" />
            <BellRing className="size-4" />
            <User loaderColor="black" />
          </div>
        </header>
        <div className="w-full h-full bg-zinc-300 p-10">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-xl font-medium">All your recipes</h2>
            <NewItem />
          </div>
          <div className="flex items-center justify-center mt-20">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 px-10 gap-10">
              {/* {user?.recipes.length === 0 && <p>Empty</p>}
              {user?.recipes.map((recipe) => (
                <div key={recipe.id}>{recipe.id}</div>
              ))} */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
