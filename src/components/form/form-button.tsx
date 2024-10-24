"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  type?: "submit" | "button" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?:
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "default";
  size?: "sm" | "default" | "lg" | "icon";
  onClick?: () => void;
};

export const FormButton = ({
  type = "submit",
  className,
  disabled,
  children,
  variant = "default",
  onClick,
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={onClick}
      type={type}
      className={cn("", className)}
      disabled={pending || disabled}
      variant={variant}
      size={"sm"}
    >
      {children}
    </Button>
  );
};
