import { techs } from "@/constant";
import Image from "next/image";
import Link from "next/link";

export const Techs = () => {
  return (
    <div className="space-y-20 mb-20">
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl text-center">What i use ??</h2>
        <p className="text-center text-neutral-500 text-sm">
          I use this technologies to create this platform
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 lg:px-0 pb-20">
        {techs.map((tech) => (
          <Link
            href={tech.href}
            key={tech.href}
            className="group/source-box flex flex-col rounded-3xl p-6 md:p-8 bg-white/5 backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
          >
            <div className="w-full flex items-center justify-between">
              <h3 className="text-xl">{tech.title}</h3>
              <Image src={tech.svg} alt="logo" width={35} height={35} />
            </div>
            <span className="text-neutral-500 text-sm">{tech.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
