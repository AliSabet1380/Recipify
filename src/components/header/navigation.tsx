"use client";

import Link from "next/link";

import { routes } from "@/constant";

import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="hidden lg:flex items-center gap-x-4">
      {routes.map((route) => (
        <Button key={route.href} variant={"link"}>
          <Link className="text-white" href={route.href}>
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};
