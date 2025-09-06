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
  Instagram
} from "lucide-react";

interface FooterProps {
  className?: string;
}

// Icon mapping for footer links
const getIcon = (id: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    home: <Home className="w-[19.2px] h-[19.2px]" />,
    authors: <Users className="w-[19.2px] h-[19.2px]" />,
    categories: <FolderOpen className="w-[19.2px] h-[19.2px]" />,
    explore: <Search className="w-[19.2px] h-[19.2px]" />,
    articles: <FileText className="w-[19.2px] h-[19.2px]" />,
    recipes: <ChefHat className="w-[19.2px] h-[19.2px]" />,
    about: <Info className="w-[19.2px] h-[19.2px]" />,
    privacy: <Shield className="w-[19.2px] h-[19.2px]" />,
    terms: <ScrollText className="w-[19.2px] h-[19.2px]" />,
    cookies: <Cookie className="w-[19.2px] h-[19.2px]" />,
    disclaimer: <AlertTriangle className="w-[19.2px] h-[19.2px]" />,
    faq: <HelpCircle className="w-[19.2px] h-[19.2px]" />,
    contact: <Mail className="w-[19.2px] h-[19.2px]" />,
    search: <Search className="w-[19.2px] h-[19.2px]" />,
    sitemap: <Map className="w-[19.2px] h-[19.2px]" />,
    feed: <Rss className="w-[19.2px] h-[19.2px]" />,
  };
  return iconMap[id] || <FileText className="w-[19.2px] h-[19.2px]" />;
};

// Social icon mapping
const getSocialIcon = (iconSrc: string) => {
  const socialIconMap: { [key: string]: React.ReactNode } = {
    facebook: <Facebook className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
  };
  return socialIconMap[iconSrc] || <Mail className="w-4 h-4" />;
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
      className={`items-center box-border gap-x-[25.6px] flex flex-col gap-y-[25.6px] my-[51.2px] ${
        className || ""
      }`}
    >
      <div className="relative bg-stone-100 box-border max-w-full outline-neutral-900 -outline-offset-8 outline-dashed outline-1 w-full p-8">
        <div className="relative box-border max-w-full w-full mx-auto px-4">
          <ul className="text-[15.36px] box-border gap-x-4 flex flex-wrap justify-center leading-[24.576px] gap-y-2 pl-0 md:text-[19.2px] md:leading-[30.72px]">
            {footerLinks.map((link) => {
              // Check if current link is active based on pathname
              const isActive = pathname === link.href || 
                             (link.href !== "/" && pathname.startsWith(link.href));
              
              // Create dynamic className with active state
              const dynamicClassName = link.className
                .replace(/text-orange-700|text-neutral-900/, isActive ? 'text-orange-700' : 'text-neutral-900');

              return (
                <li
                  key={link.id}
                  className="text-[15.36px] box-border flex leading-[24.576px] list-none text-left md:text-[19.2px] md:leading-[30.72px]"
                >
                  <Link
                    href={link.href}
                    title={link.title}
                    className={`${dynamicClassName} hover:text-blue-600 transition-colors duration-200`}
                  >
                    {getIcon(link.id)}
                    <span className="text-[15.36px] box-border block leading-[24.576px] md:text-[19.2px] md:leading-[30.72px]">
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

        <div className="text-neutral-900 text-[11.52px] font-bold box-border leading-[18.432px] text-center mt-[12.8px] md:text-[13.44px] md:leading-[21.504px]">
          <span className="text-[11.52px] box-border leading-[18.432px] md:text-[13.44px] md:leading-[21.504px]">
            {getCopyrightText()}
          </span>
          <br className="text-[11.52px] box-border leading-[18.432px] md:text-[13.44px] md:leading-[21.504px]" />
          <span className="text-[11.52px] box-border leading-[18.432px] md:text-[13.44px] md:leading-[21.504px]">
            {siteConfig.version}
          </span>
        </div>
      </div>
    </footer>
  );
}
