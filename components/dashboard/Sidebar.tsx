import React from "react";
import {
  Home,
  FileText,
  Users,
  Tags,
  Settings,
  Plus,
  Search,
  Filter,
  Image,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onAddRecipe: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  onAddRecipe,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "recipes", label: "All Recipes", icon: FileText },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "authors", label: "Authors", icon: Users },
    { id: "media", label: "Media Library", icon: Image },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Recipe CMS</h1>
            <p className="text-sm text-gray-500">Content Management</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onAddRecipe}
          className="w-full bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Recipe
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Search & Filter */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <button className="w-full bg-stone-100 border-2 border-dashed border-stone-300 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Recipes
          </button>
          <button className="w-full bg-stone-100 border-2 border-dashed border-stone-300 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter & Sort
          </button>
        </div>
      </div>
    </div>
  );
};
