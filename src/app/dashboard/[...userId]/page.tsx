"use client";

import { BellRing, Settings } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { User } from "@/components/header/user";
import { Separator } from "@/components/ui/separator";
import { Loading } from "@/components/ui-pages/loading";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NewRecipe } from "@/components/dashboard/new-recipe";
import { Recipe } from "@/components/dashboard/recipe";

import { useRecipes } from "@/features/recipes/api/use-recipes";
import { useUser } from "@/features/auth/api/use-user";

const Dashboard = ({
  params: { userId },
}: {
  params: { userId: string[] };
}) => {
  const { data, isLoading: userLoading } = useUser();
  const { data: recipes, isLoading: recipesLoading } = useRecipes(userId[0]);

  if (userLoading) return <Loading />;
  if (!userLoading && !data) location.reload();

  const isAuthor = data?.id == userId[0];

  return (
    <SidebarProvider>
      <AppSidebar userid={userId[0]} />
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
        <div className="w-full h-full bg-zinc-300 p-3 lg:p-7 ">
          <div className="flex items-center justify-between p-3">
            <div className="bg-white shadow-md border rounded-md flex items-center justify-center p-2">
              <p className="text-black font-bold">All recipes</p>
            </div>
            {isAuthor && <NewRecipe userId={userId[0]} />}
          </div>
          <div className="flex items-center justify-center mt-10 pb-20 px-4">
            <Recipe
              isAuthor={isAuthor}
              recipes={recipes}
              isLoading={recipesLoading}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
