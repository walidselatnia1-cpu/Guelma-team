import { NavigationItem } from "@/outils/types";

export const navigationItems: NavigationItem[] = [
  {
    id: "categories",
    href: "/categories",
    title: "All categories",
    iconSrc: "/symbols-v4.svg#categories",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Categories",
  },
  {
    id: "explore",
    href: "/explore",
    title: "Explore",
    iconSrc: "/symbols-v4.svg#explore",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Explore",
  },
  {
    id: "about",
    href: "/about",
    title: "About",
    iconSrc: "/symbols-v4.svg#about",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "About",
  },
  {
    id: "contact",
    href: "/contact",
    title: "Contact Us",
    iconSrc: "/symbols-v4.svg#contact",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Contact",
  },
  {
    id: "search",
    href: "/search",
    title: "Quick & Easy Search",
    iconSrc: "/symbols-v4.svg#search",
    iconClassName: "box-border shrink-0 h-[28.8px] w-[28.8px]",
  },
] as const;
