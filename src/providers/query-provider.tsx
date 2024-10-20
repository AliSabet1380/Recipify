"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 100,
        retry: 1,
        staleTime: 2 * 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

export const QueryProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
