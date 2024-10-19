"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { HeaderLogo } from "@/components/header/header-logo";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

import { routes } from "@/constant";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
        }}
      >
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            setIsOpen(true);
          }}
          className="hover:bg-white/10"
        >
          <Menu className="size-4 text-white" />
        </Button>
        <SheetContent side={"right"}>
          <SheetTitle>
            <HeaderLogo />
          </SheetTitle>
          {routes.map((route) => (
            <div key={route.href} className="p-1 mt-4">
              <Button
                className="text-black w-full flex items-center justify-start"
                onClick={() => {
                  onClick(route.href);
                }}
                variant={"ghost"}
              >
                {route.label}
              </Button>
              <hr className="bg-slate-700 mt-2" />
            </div>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};
