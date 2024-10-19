import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const useLogout = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClinet = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      if (!response.ok) throw new Error("Fail to logout");
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      toast({
        description: "Logout successfully",
      });
      router.push("/");
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });

  return mutation;
};
