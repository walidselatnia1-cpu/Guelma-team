import React from 'react';
import {
  Home,
  Grid3X3,
  Search,
  Info,
  Mail,
  ChefHat,
  Clock,
  Users,
  Star,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  StickyNote,
  BookOpen,
  Utensils,
  Timer,
  ChefHat as Chef,
  Tag,
  Globe,
  Zap,
  HelpCircle
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

// Icon mapping for easy replacement
const iconMap = {
  // Navigation icons
  'home': Home,
  'categories': Grid3X3,
  'explore': Search,
  'about': Info,
  'contact': Mail,
  'search': Search,
  
  // Recipe icons
  'recipes': BookOpen,
  'chef': Chef,
  'cook-time': Clock,
  'prep-time': Timer,
  'total-time': Clock,
  'difficulty': Star,
  'cuisine': Globe,
  'yield': Users,
  'dietary': Zap,
  'category': Tag,
  'note': StickyNote,
  
  // UI icons
  'arrow-right': ArrowRight,
  'menu': Menu,
  'close': X,
  'faq': HelpCircle,
  'email': Mail,
  
  // Social icons
  'facebook': Facebook,
  'instagram': Instagram,
  'twitter': Twitter,
  'youtube': Youtube,
  'tiktok': MessageCircle, // Using message circle as placeholder
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '' }) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <div className={`w-6 h-6 ${className}`}></div>;
  }
  
  return <IconComponent size={size} className={className} />;
};

export default Icon;
