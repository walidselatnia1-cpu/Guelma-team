import React from "react";

interface BasicInfoFormProps {
  title: string;
  intro: string;
  img: string;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  title,
  intro,
  img,
  onChange,
  errors = {},
}) => {
  const handleSlugGenerate = () => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      onChange("slug", slug);
      onChange("href", `/recipes/${slug}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            onBlur={handleSlugGenerate}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={formData.slug || ""}
            onChange={(e) => onChange("slug", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="recipe-slug"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            <option value="appetizers">Appetizers</option>
            <option value="main-dishes">Main Dishes</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
            <option value="salads">Salads</option>
            <option value="soups">Soups</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description *
        </label>
        <textarea
          value={formData.shortDescription || ""}
          onChange={(e) => onChange("shortDescription", e.target.value)}
          rows={2}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.shortDescription ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Brief description for recipe cards"
        />
        {errors.shortDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Detailed recipe description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Intro */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Introduction
        </label>
        <textarea
          value={formData.intro || ""}
          onChange={(e) => onChange("intro", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Introduction paragraph"
        />
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Image URL
          </label>
          <input
            type="url"
            value={formData.img || ""}
            onChange={(e) => onChange("img", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image URL
          </label>
          <input
            type="url"
            value={formData.heroImage || ""}
            onChange={(e) => onChange("heroImage", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/hero-image.jpg"
          />
        </div>
      </div>
    </div>
  );
};
