import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useDeleteRecipe } from "@/features/recipes/api/usee-delete-recipe";

interface SingleRecipeProps {
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
  isAuthor: boolean;
}

export const SingleRecipe = ({
  id,
  coverImg,
  ings,
  recipe,
  title,
  isAuthor,
}: SingleRecipeProps) => {
  const { mutate, isPending } = useDeleteRecipe();

  const onDelete = () => {
    mutate({ recipeId: id });
  };

  return (
    <div className="relative h-full w-full">
      <Image src={coverImg} alt={title} fill className="object-cover" />
      <div
        className="absolute inset-0 bg-[url('/api/placeholder/800/400')] bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative p-20 flex flex-col items-center lg:items-start justify-center space-y-5">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <p className="text-sm text-center lg:text-start w-80 text-neutral-300">
          {recipe}
        </p>
        <div className="w-64 flex items-center justify-center lg:justify-normal  flex-wrap gap-1">
          {ings.map((ing) => (
            <Badge variant={"secondary"}>{ing}</Badge>
          ))}
        </div>
        {isAuthor && (
          <Button
            onClick={onDelete}
            disabled={isPending}
            variant={"destructive"}
          >
            Delete Recipe
          </Button>
        )}
      </div>
    </div>
  );
};
