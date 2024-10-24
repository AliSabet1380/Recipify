"use client";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

type TextareaProps = {
  placeholder?: string;
  rows: number;
  id: string;
  requried?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  label?: string;
  onBlur?: () => void;
};

export const FormTextarea = ({
  id,
  placeholder,
  className,
  defaultValue = "",
  disabled,
  requried,
  rows,
  label,

  onBlur,
}: TextareaProps) => {
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
        <Textarea
          rows={rows}
          onBlur={onBlur}
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
};
