"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().max(15),
  desc: z.string().max(30),

  recipe: z.string().min(5).max(200),
});

export type NewItemValues = z.infer<typeof formSchema>;

interface NewItemFormProps {
  onSubmit: (values: NewItemValues) => void;
  disabled?: boolean;
  defaultValues?: NewItemValues;
}

export const NewItemForm = ({
  onSubmit,
  disabled,
  defaultValues = { title: "", desc: "", recipe: "" },
}: NewItemFormProps) => {
  const form = useForm<NewItemValues>({
    resolver: zodResolver(formSchema),
    disabled,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center space-y-3.5 text-black"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="border"
                  placeholder="Recipe title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="desc"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="border"
                  placeholder="Recipe description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="recipe"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Recipe"
                  className="border resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
