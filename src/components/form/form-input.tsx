"use client";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
  type?: string;
  id: string;
  requried?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  label?: string;
  onBlur?: () => void;
  errors?: Record<string, string[] | undefined>;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      placeholder,
      className,
      defaultValue = "",
      disabled,
      requried,
      type = "text",
      label,
      errors,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="w-full space-y-2">
        <div className="w-full space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-800"
            >
              {label}
            </Label>
          )}
          <Input
            onBlur={onBlur}
            ref={ref}
            type={type}
            className={cn("", className)}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={requried}
            disabled={pending || disabled}
          />
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FromInput";
