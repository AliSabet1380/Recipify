"use client";

import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/actions/safe-action";

type Options<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  onCompelet?: () => void;
};

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: Options<TOutput>
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const excute = useCallback(
    async (data: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(data);
        if (!result) return;

        setFieldErrors(result.fieldErrors);

        if (result.data) options?.onSuccess?.(result.data);
        if (result.errors) options?.onError?.(result.errors);
      } finally {
        setIsLoading(false);
        options?.onCompelet?.();
      }
    },
    [action, options]
  );

  return { excute, isLoading, fieldErrors };
};
