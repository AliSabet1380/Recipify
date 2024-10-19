"use client";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/landing/footer";
import { GetStart } from "@/components/landing/get-start";
import { Hero } from "@/components/landing/hero";
import { Techs } from "@/components/landing/techs";

// Home page
const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <GetStart />
      <Techs />
      <Footer />
    </div>
  );
};

export default Home;
