import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";

import { client } from "@/lib/hono";

type Req = InferRequestType<
  (typeof client.api.auth)["sign-up"]["$post"]
>["json"];
type Res = InferResponseType<(typeof client.api.auth)["sign-up"]["$post"], 201>;

export const useSignup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutate = useMutation<Res, Error, Req>({
    mutationFn: async (json) => {
      const response = await client.api.auth["sign-up"]["$post"]({ json });

      if (!response.ok) throw new Error((await response.json()).error);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        description: "Sign in successfully",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });

  return mutate;
};
