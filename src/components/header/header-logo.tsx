import Link from "next/link";
import Image from "next/image";

interface HeaderLogoProps {
  url?: string;
}

export const HeaderLogo = ({ url = "/" }: HeaderLogoProps) => {
  return (
    <Link href={url} className="flex items-center gap-x-2">
      <Image src={"/logo.svg"} alt="logo" width={25} height={25} />
      <span className="text-lg font-semibold">Recipify</span>
    </Link>
  );
};
