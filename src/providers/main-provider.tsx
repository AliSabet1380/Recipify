"use client";

import { useState, useEffect } from "react";

export const MainProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
};
