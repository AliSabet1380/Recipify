"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface RecipeProps {
  recipes:
    | {
        id: string;
        createdAt: string;
        desc: string;
        title: string;
        ings: string[];
        authorId: string;
        recipe: string;
        coverImg: string;
        author: {
          username: string;
        };
      }[]
    | undefined;
  isLoading: boolean;
}

export const Recipe = ({ recipes, isLoading }: RecipeProps) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center lg:grid lg:grid-cols-3 gap-y-10">
      {isLoading && <Loader2 className="size-5 animate-spin" />}
      {!isLoading && recipes?.length === 0 && <p className="">no recipes</p>}
      {!isLoading &&
        recipes?.map((recipe) => (
          <Link
            href={`/dashboard/recipe/${recipe.id}`}
            className="flex flex-col items-center lg:w-64 lg:h-80 h-[400px] w-[350px] rounded-lg p-2 bg-white/60 backdrop-blur transition hover:scale-[1.009] hover:bg-white/50"
            key={recipe.id}
          >
            <div className="relative w-full  h-64 lg:h-40">
              <Image
                src={recipe.coverImg}
                alt={recipe.title}
                fill
                className="rounded-md"
              />
            </div>
            <div className="p-1 w-full flex flex-col items-start space-y-1">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <span className="text-sm text-neutral-700 font-medium">
                {recipe.desc}
              </span>
              <span className="hidden lg:inline w-full text-xs text-neutral-700 text-wrap">
                {recipe.recipe.slice(0, 40)}{" "}
                {recipe.recipe.length > 40 && "..."}
              </span>
              <span className="lg:hidden inline w-full text-xs text-neutral-700 text-wrap">
                {recipe.recipe.slice(0, 120)}{" "}
                {recipe.recipe.length > 120 && "..."}
              </span>
            </div>
            <div className="w-full flex flex-wrap items-center gap-1 pt-2">
              {recipe.ings.slice(0, 2).map((ing) => (
                <div
                  key={ing}
                  className="bg-slate-700 p-2 rounded-full text-xs text-white font-medium"
                >
                  {ing}
                </div>
              ))}
              {recipe.ings.length > 3 && (
                <div className="bg-slate-700 p-2 rounded-full text-xs text-white font-bold">
                  more ...
                </div>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
};
