"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, ElementRef, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormButton } from "@/components/form/form-button";

import { useAction } from "@/hooks/use-action";

import { createNewRecipe } from "@/actions/create-recipe";

import { useNewRecipe } from "@/features/recipes/hooks/use-new-recipe";
import { FormTextarea } from "@/components/form/form-textarea";

export const NewRecipeForm = () => {
  const queryClient = useQueryClient();
  const formRef = useRef<ElementRef<"form">>(null);
  const fileInputRef = useRef<ElementRef<"input">>(null);
  const ingInputRef = useRef<ElementRef<"input">>(null);

  const { toast } = useToast();
  const { close, userId } = useNewRecipe();
  const { pending } = useFormStatus();
  const [ings, setIngs] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const { excute, isLoading } = useAction(createNewRecipe, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["own-recipes"] });
      toast({
        description: "recipe created",
      });
      close();
    },
    onError: (error) => {
      toast({
        description: error,
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

  const onFilterIngs = (i: number) => {
    const newIngs = ings.filter((_, idx) => {
      return idx !== i;
    });
    setIngs(newIngs);
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
      <FormInput
        disabled={isLoading || pending}
        id="title"
        placeholder="Recipe title"
        className="w-full border-2"
      />
      <FormInput
        disabled={isLoading || pending}
        id="desc"
        placeholder="Recipe Description"
        className="w-full border-2"
      />
      {ings && (
        <div className="w-full flex flex-wrap items-center gap-1">
          {ings.map((ing, i) => (
            <div
              key={i}
              className="w-fit px-3 flex items-center justify-between rounded-full bg-slate-800 text-white text-xs font-semibold"
            >
              {ing}
              <Button
                onClick={() => onFilterIngs(i)}
                type="button"
                size={"sm"}
                variant={"link"}
              >
                <X className="text-white size-2" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="w-full border rounded-md flex items-center justify-between px-1">
        <FormInput
          disabled={isLoading || pending}
          placeholder="Enter Your ing"
          id="ing"
          ref={ingInputRef}
        />
        <FormButton
          type="button"
          disabled={isLoading || pending}
          onClick={onAddIng}
          variant={"link"}
        >
          <Plus className="size-3" />
        </FormButton>
      </div>
      <FormTextarea
        disabled={isLoading || pending}
        placeholder="Recipe"
        rows={5}
        className="w-full border resize-none"
        id="recipe"
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
          <FormButton
            size={"sm"}
            type="button"
            variant={"outline"}
            disabled={isLoading || pending}
            onClick={onRemove}
          >
            Remove Image
          </FormButton>
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

      <FormButton className="w-full">Create Recipe</FormButton>
    </form>
  );
};
