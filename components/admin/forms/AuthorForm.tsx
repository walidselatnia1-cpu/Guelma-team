import React from "react";
import { Author } from "@/outils/types";

interface AuthorFormProps {
  img: string;
  author: Author;
  onChange: (author: Author) => void;
  errors?: Record<string, string>;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({
  img,
  author,
  onChange,
  errors = {},
}) => {
  const handleChange = (field: keyof Author, value: string) => {
    onChange({
      ...author,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name *
          </label>
          <input
            type="text"
            value={author.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors?.authorName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Author's full name"
          />
          {errors?.authorName && (
            <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>
          )}
        </div>

        {/* Author Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Profile Link
          </label>
          <input
            type="url"
            value={author.link || ""}
            onChange={(e) => handleChange("link", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/authors/author-name or https://..."
          />
        </div>
      </div>

      {/* Author Avatar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author Avatar URL
        </label>
        <input
          type="url"
          value={author.avatar || ""}
          onChange={(e) => handleChange("avatar", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/avatar.jpg"
        />
        {author.avatar && (
          <div className="mt-2">
            <img
              src={img}
              alt="Author Avatar Preview"
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Author Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author Bio
        </label>
        <textarea
          value={author.bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Brief biography of the author"
        />
      </div>
    </div>
  );
};
