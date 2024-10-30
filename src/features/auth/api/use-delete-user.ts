import { useQueryClient, useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.auth.delete.$delete();

      if (!response.ok) throw new Error((await response.json()).error);

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        description: "User deleted successfully",
      });
      location.replace("/");
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });
  return mutation;
};
