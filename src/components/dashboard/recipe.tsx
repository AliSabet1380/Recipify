"use client";

import Link from "next/link";
import Image from "next/image";

import { Loading } from "@/components/ui-pages/loading";
import { Badge } from "@/components/ui/badge";

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
  isAuthor: boolean;
}

export const Recipe = ({ recipes, isLoading, isAuthor }: RecipeProps) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center lg:grid lg:grid-cols-4 gap-y-10">
      {isLoading && <Loading />}
      {!isLoading && recipes?.length === 0 && (
        <div className="w-full flex items-center justify-center mt-20">
          no recipes
        </div>
      )}
      {!isLoading &&
        recipes?.map((recipe) => (
          <div
            className="flex flex-col items-center lg:w-64 lg:h-80 h-[400px] w-[350px] rounded-lg p-2 bg-white/60 transition hover:scale-[1.009] hover:bg-white/50"
            key={recipe.id}
          >
            <Link
              href={`/dashboard/recipe/${recipe.id}`}
              className="relative w-full  h-64 lg:h-40"
            >
              <Image
                src={recipe.coverImg}
                alt={recipe.title}
                fill
                className="rounded-md"
              />
            </Link>
            <div className="p-1 w-full flex flex-col items-start space-y-1">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                {isAuthor && <Badge>Yours</Badge>}
              </div>
              <span className="text-sm text-neutral-700 font-medium">
                {recipe.desc}
              </span>
              <span className="hidden lg:inline w-full text-xs text-neutral-700 text-wrap">
                {recipe.recipe.slice(0, 30)}{" "}
                {recipe.recipe.length > 30 && "..."}
              </span>
              <span className="lg:hidden inline w-full text-xs text-neutral-700 text-wrap">
                {recipe.recipe.slice(0, 120)}{" "}
                {recipe.recipe.length > 120 && "..."}
              </span>
            </div>
            <div className="w-full flex flex-wrap items-center gap-1 pt-2">
              {recipe.ings.slice(0, 2).map((ing) => (
                <Badge>{ing}</Badge>
              ))}
              {recipe.ings.length > 2 && <Badge>more ...</Badge>}
            </div>
          </div>
        ))}
    </div>
  );
};
