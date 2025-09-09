"use client";
import React from "react";
import { footerLinks } from "@/data/footerLinks";
import { socialLinks } from "@/data/socialLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig, getCopyrightText } from "@/config/site";
import {
  Home,
  Users,
  FolderOpen,
  Search,
  FileText,
  ChefHat,
  Info,
  Shield,
  HelpCircle,
  Mail,
  ScrollText,
  Cookie,
  AlertTriangle,
  Map,
  Rss,
  Facebook,
  Instagram,
} from "lucide-react";

interface FooterProps {
  className?: string;
}

// Icon mapping for footer links
const getIcon = (id: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    home: <Home className="w-5 h-5" />,
    authors: <Users className="w-5 h-5" />,
    categories: <FolderOpen className="w-5 h-5" />,
    explore: <Search className="w-5 h-5" />,
    articles: <FileText className="w-5 h-5" />,
    recipes: <ChefHat className="w-5 h-5" />,
    about: <Info className="w-5 h-5" />,
    privacy: <Shield className="w-5 h-5" />,
    terms: <ScrollText className="w-5 h-5" />,
    cookies: <Cookie className="w-5 h-5" />,
    disclaimer: <AlertTriangle className="w-5 h-5" />,
    faq: <HelpCircle className="w-5 h-5" />,
    contact: <Mail className="w-5 h-5" />,
    search: <Search className="w-5 h-5" />,
    sitemap: <Map className="w-5 h-5" />,
    feed: <Rss className="w-5 h-5" />,
  };
  return iconMap[id] || <FileText className="w-5 h-5" />;
};

// Social icon mapping
const getSocialIcon = (iconSrc: string) => {
  const socialIconMap: { [key: string]: React.ReactNode } = {
    facebook: <Facebook className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
  };
  return socialIconMap[iconSrc] || <Mail className="w-5 h-5" />;
};

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isAdmin = segments[segments.length - 1] === "admin";
  if (isAdmin) {
    return <></>;
  }
  return (
    <footer
      className={`items-center box-border gap-x-6 flex flex-col gap-y-6 my-12 ${
        className || ""
      }`}
    >
      <div className="relative bg-stone-100 box-border max-w-full outline-neutral-900 -outline-offset-8 outline-dashed outline-1 w-full p-8">
        <div className="relative box-border max-w-full w-full mx-auto px-4">
          <ul className="text-sm gap-x-4 flex flex-wrap justify-center gap-y-2 pl-0 md:text-lg">
            {footerLinks.map((link) => {
              // Check if current link is active based on pathname
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              // Create dynamic className with active state
              const dynamicClassName = link.className.replace(
                /text-orange-700|text-neutral-900/,
                isActive ? "text-orange-700" : "text-neutral-900"
              );

              return (
                <li
                  key={link.id}
                  className="text-sm flex list-none text-left md:text-lg"
                >
                  <Link
                    href={link.href}
                    title={link.title}
                    className={`${dynamicClassName} hover:text-blue-600 transition-colors duration-200`}
                  >
                    {getIcon(link.id)}
                    <span className="text-sm block md:text-lg">
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="box-border">
        <div className="box-border gap-x-4 flex flex-col justify-center gap-y-4 text-center">
          <div className="items-center box-border gap-x-4 flex flex-wrap justify-center gap-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                title={link.title}
                className="text-white items-center bg-black box-border flex h-8 justify-center w-8 rounded-[50%] transition-transform duration-300 hover:scale-110"
              >
                {getSocialIcon(link.iconSrc)}
              </a>
            ))}
          </div>
        </div>

        <div className="text-neutral-900 text-xs font-bold text-center mt-3 md:text-sm">
          <span className="text-xs md:text-sm">{getCopyrightText()}</span>
          <br className="text-xs md:text-sm" />
          <span className="text-xs md:text-sm">{siteConfig.version}</span>
        </div>
      </div>
    </footer>
  );
}
