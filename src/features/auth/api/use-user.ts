import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type Res = InferResponseType<typeof client.api.auth.me.$get, 200>["data"];

export const useUser = () => {
  const localData = localStorage.getItem("user");
  const initialData = localData && JSON.parse(localData);

  const query = useQuery<Res, Error>({
    queryKey: ["user"],
    initialData,
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    queryFn: async () => {
      const response = await client.api.auth.me.$get();

      if (!response.ok) throw new Error((await response.json()).error);

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
