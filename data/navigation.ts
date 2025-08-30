import { NavigationItem } from "@/outils/types";

export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    href: "/",
    title: "Home",
    iconSrc: "home",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Home",
  },
  {
    id: "categories",
    href: "/categories",
    title: "All categories",
    iconSrc: "categories",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Categories",
  },
  {
    id: "explore",
    href: "/explore",
    title: "Explore",
    iconSrc: "explore",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Explore",
  },
  {
    id: "about",
    href: "/about",
    title: "About",
    iconSrc: "about",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "About",
  },
  {
    id: "contact",
    href: "/contact",
    title: "Contact Us",
    iconSrc: "contact",
    iconClassName: "box-border shrink-0 h-[19.2px] w-[19.2px]",
    label: "Contact",
  },
  {
    id: "search",
    href: "/search",
    title: "Quick & Easy Search",
    iconSrc: "search",
    iconClassName: "box-border shrink-0 h-[28.8px] w-[28.8px]",
  },
] as const;
