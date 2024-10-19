import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useToast } from "@/hooks/use-toast";

export const useLogout = () => {
  const { toast } = useToast();

  const queryClinet = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      if (!response.ok) throw new Error("Fail to logout");
    },
    onSuccess: () => {
      toast({
        description: "Logout successfully",
      });
      localStorage.removeItem("user");
      queryClinet.invalidateQueries({ queryKey: ["user"] });
      window.location.reload();
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });

  return mutation;
};
