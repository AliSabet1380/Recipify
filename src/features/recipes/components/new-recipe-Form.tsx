"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, ElementRef, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAction } from "@/hooks/use-action";
import { createNewRecipe } from "@/actions/create-recipe";
import { useNewItem } from "@/features/recipes/hooks/use-new-recipe";

export const NewRecipeForm = () => {
  const formRef = useRef<ElementRef<"form">>(null);
  const fileInputRef = useRef<ElementRef<"input">>(null);
  const ingInputRef = useRef<ElementRef<"input">>(null);
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { userId } = useNewItem();
  const { pending } = useFormStatus();
  const [ings, setIngs] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const { excute, isLoading, fieldErrors } = useAction(createNewRecipe, {
    onSuccess: (data) => {
      // invalida Query
      //   queryClient.invalidateQueries({ queryKey: ["own-recipes"] });
      toast({
        description: "recipe created",
      });
    },
  });

  const onPickFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setPreview(URL.createObjectURL(file));
  };
  const onAddOrChangeImage = () => {
    fileInputRef.current?.click();
  };
  const onRemove = () => {
    formRef.current?.reset();
    setPreview(null);
    setIngs([]);
  };
  const onAddIng = () => {
    const ing = ingInputRef.current?.value;
    if (!ing) return;

    setIngs((pervState) => [...pervState, ing]);
    ingInputRef.current.value = "";
  };

  const onSubmit = (formData: FormData) => {
    excute({ formData, ings, userId });
  };

  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="w-full flex flex-col items-center space-y-3 text-black"
    >
      <Input
        disabled={isLoading || pending}
        name="title"
        placeholder="Recipe title"
        className="w-full border-2"
      />
      <Input
        disabled={isLoading || pending}
        name="desc"
        placeholder="Recipe Description"
        className="w-full border-2"
      />
      {ings && (
        <div className="w-full flex flex-wrap items-center gap-1">
          {ings.map((ing, i) => (
            <div
              key={i}
              className=" px-3  flex items-center justify-between rounded-full bg-slate-800 text-white text-xs font-semibold"
            >
              {ing}
              <Button type="button" size={"icon"} variant={"link"}>
                <X className="text-white size-2" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="w-full border rounded-md flex items-center justify-between px-1">
        <Input
          disabled={isLoading || pending}
          placeholder="Enter Your ing"
          name="ing"
          ref={ingInputRef}
        />
        <Button
          type="button"
          disabled={isLoading || pending}
          onClick={onAddIng}
          variant={"link"}
        >
          +
        </Button>
      </div>
      <Textarea
        disabled={isLoading || pending}
        placeholder="Recipe"
        rows={5}
        className="w-full border resize-none"
        name="recipe"
      />
      <input
        hidden
        onChange={onPickFile}
        name="coverImg"
        type="file"
        ref={fileInputRef}
        accept="image/*"
      />

      {preview && (
        <Image
          src={preview}
          alt="image preview"
          className="rounded-lg"
          width={400}
          height={300}
        />
      )}
      <div className="w-full flex items-center justify-end space-x-5">
        {preview && (
          <Button
            size={"sm"}
            type="button"
            variant={"outline"}
            disabled={isLoading || pending}
            onClick={onRemove}
          >
            Remove Image
          </Button>
        )}
        <Button
          size={"sm"}
          type="button"
          disabled={isLoading || pending}
          onClick={onAddOrChangeImage}
        >
          {preview ? "Change Image" : "Add Image"}
        </Button>
      </div>

      <Button className="w-full">Create Recipe</Button>
    </form>
  );
};
