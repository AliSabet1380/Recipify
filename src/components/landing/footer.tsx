import { HeaderLogo } from "@/components/header/header-logo";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center space-y-5 pb-20">
      <HeaderLogo />
      <span className="text-center text-sm text-neutral-500">
        ©️ This Website created by Ali Sabet as parctice
      </span>
      <span className="text-lg text-center">Oct 2024, Iran, Fars, Shiraz</span>
      <div className="flex items-center space-x-5">
        <Link href={"https://github.com/AliSabet1380"}>
          <Image src={"/github.svg"} alt="github" width={25} height={25} />
        </Link>
      </div>
    </footer>
  );
};
