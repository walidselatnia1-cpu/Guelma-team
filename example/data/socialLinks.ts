import { siteConfig } from "@/config/site";

export interface SocialLink {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly iconSrc: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    href: siteConfig.social.facebook,
    title: "Facebook",
    iconSrc: "facebook",
  },
  {
    id: "pinterest",
    href: siteConfig.social.instagram, // Using Instagram URL as Pinterest substitute
    title: "Pinterest",
    iconSrc: "instagram", // Using Instagram as Pinterest substitute
  },
  {
    id: "email",
    href: siteConfig.social.email,
    title: "Email",
    iconSrc: "email",
  },
] as const;
