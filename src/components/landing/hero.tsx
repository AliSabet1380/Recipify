import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative z-10 py-20 mt-20 lg:mt-36 w-full flex items-center flex-col justify-center mb-36">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] lg:w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-[100px] bg-emerald-500"></div>
      <h1 className="text-center text-6xl font-bold leading-none md:text-[8rem] bg-gradient-to-r from-20% bg-clip-text text-transparent from-emerald-400 to-yellow-300 select-none">
        Recipe Platform
      </h1>
      <span className="mt-10 text-sm text-white text-center">
        A full-free recipe platform to findout all diffrent recipe of foods that
        you want, all around the world by simple create an account!
      </span>
      <Image src={"/landing.png"} alt="image" width={450} height={450} />

      <h3 className="text-white text-lg font-medium text-center spacex-4">
        A Pesonal Project by
        <p className="bg-gradient-to-r bg-clip-text text-transparent from-emerald-400 to-yellow-300">
          Ali Sabet
        </p>
      </h3>
    </section>
  );
};
