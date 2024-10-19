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

const formSchema = z.object({});

export type NewItemValues = z.infer<typeof formSchema>;

interface NewItemFormProps {
  onSubmit: (values: NewItemValues) => void;
  disabled?: boolean;
  defaultValues?: NewItemValues;
}

export const NewItemForm = ({
  onSubmit,
  disabled,
  defaultValues = {},
}: NewItemFormProps) => {
  const form = useForm<NewItemValues>({
    resolver: zodResolver(formSchema),
    disabled,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=""></form>
    </Form>
  );
};
