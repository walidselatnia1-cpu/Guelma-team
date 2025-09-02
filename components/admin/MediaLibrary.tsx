"use client";
import React, { useState } from "react";
import { ImageGallery } from "./ImageGallery";
import { FileUpload } from "./FileUpload";
import { ImageUsageViewer } from "./ImageUsageViewer";
import { Upload, Image, FolderOpen, Link } from "lucide-react";

const categories = [
  { id: "all", name: "All Images", icon: FolderOpen },
  { id: "recipes", name: "Recipe Images", icon: Image },
  { id: "general", name: "General", icon: Upload },
  { id: "ingredients", name: "Ingredients", icon: Image },
  { id: "authors", name: "Authors", icon: Image },
];

const tabs = [
  { id: "gallery", name: "Gallery", icon: Image },
  { id: "usage", name: "Image Usage", icon: Link },
];

export const MediaLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("gallery");
  const [showUpload, setShowUpload] = useState(false);

  const handleFileUploaded = (fileUrl: string, fileName: string) => {
    // You might want to refresh the gallery or show a success message
    setShowUpload(false);
    // Trigger a refresh of the gallery
    window.location.reload(); // Simple approach, you could use state management instead
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Media Library
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your uploaded images and recipe assignments
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowUpload(!showUpload)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
            </div>
          </div>

          {/* Upload Section */}
          {showUpload && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Image Gallery */}
            <ImageGallery category={selectedCategory} />
          </div>
        )}

        {activeTab === "usage" && <ImageUsageViewer />}
      </div>
    </div>
  );
};
