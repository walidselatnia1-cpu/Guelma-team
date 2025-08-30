export interface SocialLink {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly iconSrc: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    href: "https://web.facebook.com/profile.php?id=61555199463164",
    title: "Facebook",
    iconSrc: "facebook",
  },
  {
    id: "pinterest",
    href: "https://www.pinterest.com/recipesbyclare",
    title: "Pinterest",
    iconSrc: "instagram", // Using Instagram as Pinterest substitute
  },
  {
    id: "email",
    href: "mailto://contact@recipesbyclare.com",
    title: "Email",
    iconSrc: "email",
  },
] as const;
