export const routes = [
  {
    href: "/about",
    label: "About us",
  },
  {
    href: "/contact",
    label: "Contact us",
  },
  {
    href: "/blog",
    label: "Blog",
  },
] as const;

export const techs = [
  {
    href: "https://react.dev",
    title: "React",
    desc: "User Interface Library",
    svg: "react.svg",
  },
  {
    href: "https://nextjs.org",
    title: "Next Js",
    desc: "Full-Stack react framework",
    svg: "next.svg",
  },
  {
    href: "https://orm.drizzle.team/",
    title: "Drizzle orm",
    desc: "Drizzle to connect to database",
    svg: "/drizzle.png",
  },
  {
    href: "https://hono.dev/",
    title: "Neon",
    desc: "Neon Database as serverless postgresql",
    svg: "neon.svg",
  },
  {
    href: "https://hono.dev",
    title: "Hono",
    desc: "A lightweight backend framework",
    svg: "hono.svg",
  },
  {
    href: "https://tanstack.com",
    title: "Tanstack react-query",
    desc: "To Manage querys and stage manager",
    svg: "react-query.svg",
  },
  {
    href: "https://zod.dev/",
    title: "Zod",
    desc: "TypeScript-first schema validation with static type inference",
    svg: "zod.svg",
  },
  {
    href: "https://ui.shadcn.com/",
    title: "Shadcn",
    desc: "UI library for tailwind",
    svg: "/shadcn.png",
  },
] as const;
