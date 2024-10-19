import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const GetStart = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center  justify-between space-y-20 mb-32">
      <div className="flex flex-col items-center lg:items-start space-y-7 w-96">
        <h3 className="text-3xl lg:text-4xl text-white text-center">
          We tell you How ???
        </h3>

        <span className="text-sm text-neutral-400 text-center lg:text-left">
          You can start add your ingrediant and also see other people
          ingrediants by just simple create a total free account. Just create a
          free account and expolre +1000 amazing recipes from all around the
          world!
        </span>

        <Button className="bg-blue-700 hover:bg-blue-700/70 w-2/3" asChild>
          <Link href={"/login"}>Get Start</Link>
        </Button>
      </div>
      <Image src={"/landing-1.png"} alt="image" width={300} height={300} />
    </div>
  );
};
