import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Eye } from "lucide-react";
import { Recipe } from "@/outils/types";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
  recipe?: Recipe;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  recipe,
}) => {
  const [formData, setFormData] = useState<Partial<Recipe>>({});
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    } else {
      // Initialize with default values for new recipe
      setFormData({
        id: Date.now().toString(),
        title: "",
        slug: "",
        intro: "",
        description: "",
        shortDescription: "",
        story: "",
        testimonial: "",
        img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        heroImage:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        imageAlt: "",
        category: "",
        categoryLink: "",
        categoryHref: "",
        featuredText: "",
        href: "",
        updatedDate: new Date().toISOString().split("T")[0],
        serving: "",
        storage: "",
        allergyInfo: "",
        nutritionDisclaimer: "",
        author: {
          name: "",
          link: "",
          bio: "",
          avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        },
        timing: {
          prepTime: "",
          cookTime: "",
          totalTime: "",
        },
        recipeInfo: {
          dietary: "",
          cuisine: "",
          servings: "",
          difficulty: "4",
        },
        allCategories: [],
        whyYouLove: {
          title: "",
          type: "",
          items: [],
        },
        essIngredientGuide: [],
        ingredientGuide: [],
        ingredients: [],
        instructions: [],
        completeProcess: [],
        sections: [],
        mustKnowTips: [],
        professionalSecrets: [],
        faq: [],
        questions: {
          title: "",
          items: [],
        },
        images: [],
        notes: [],
        tools: [],
        relatedRecipes: [],
      });
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      onSave(formData as Recipe);
      onClose();
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof Recipe],
        [field]: value,
      },
    }));
  };

  const addArrayItem = (field: string, item: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...((prev[field as keyof Recipe] as any[]) || []), item],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        (prev[field as keyof Recipe] as any[])?.filter((_, i) => i !== index) ||
        [],
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "content", label: "Content" },
    { id: "ingredients", label: "Ingredients" },
    { id: "instructions", label: "Instructions" },
    { id: "metadata", label: "Metadata" },
    { id: "media", label: "Media" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {recipe ? "Edit Recipe" : "Add New Recipe"}
            </h2>
            {recipe && (
              <span className="text-sm text-gray-500">ID: {recipe.id}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(95vh-200px)]"
        >
          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug || ""}
                      onChange={(e) => updateField("slug", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription || ""}
                    onChange={(e) =>
                      updateField("shortDescription", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description for recipe cards"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detailed recipe description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intro
                  </label>
                  <textarea
                    value={formData.intro || ""}
                    onChange={(e) => updateField("intro", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Recipe introduction"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category || ""}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Text
                    </label>
                    <input
                      type="text"
                      value={formData.featuredText || ""}
                      onChange={(e) =>
                        updateField("featuredText", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Editor's Choice, Popular"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Story
                  </label>
                  <textarea
                    value={formData.story || ""}
                    onChange={(e) => updateField("story", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="The story behind this recipe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial
                  </label>
                  <textarea
                    value={formData.testimonial || ""}
                    onChange={(e) => updateField("testimonial", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Customer testimonial or review"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Must-Know Tips
                  </label>
                  <div className="space-y-3">
                    {formData.mustKnowTips?.map((tip, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={tip}
                          onChange={(e) => {
                            const updated = [...(formData.mustKnowTips || [])];
                            updated[index] = e.target.value;
                            updateField("mustKnowTips", updated);
                          }}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter a helpful tip"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem("mustKnowTips", index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("mustKnowTips", "")}
                      className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Tip
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Professional Secrets
                  </label>
                  <div className="space-y-3">
                    {formData.professionalSecrets?.map((secret, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={secret}
                          onChange={(e) => {
                            const updated = [
                              ...(formData.professionalSecrets || []),
                            ];
                            updated[index] = e.target.value;
                            updateField("professionalSecrets", updated);
                          }}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter a professional secret"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("professionalSecrets", index)
                          }
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("professionalSecrets", "")}
                      className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Secret
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === "ingredients" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Ingredient Guide
                  </label>
                  <div className="space-y-3">
                    {formData.ingredientGuide?.map((ingredient, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-3 items-start"
                      >
                        <input
                          type="text"
                          value={ingredient.name}
                          onChange={(e) => {
                            const updated = [
                              ...(formData.ingredientGuide || []),
                            ];
                            updated[index] = {
                              ...updated[index],
                              name: e.target.value,
                            };
                            updateField("ingredientGuide", updated);
                          }}
                          placeholder="Ingredient name"
                          className="col-span-5 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={ingredient.amount}
                          onChange={(e) => {
                            const updated = [
                              ...(formData.ingredientGuide || []),
                            ];
                            updated[index] = {
                              ...updated[index],
                              amount: e.target.value,
                            };
                            updateField("ingredientGuide", updated);
                          }}
                          placeholder="Amount"
                          className="col-span-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={ingredient.notes}
                          onChange={(e) => {
                            const updated = [
                              ...(formData.ingredientGuide || []),
                            ];
                            updated[index] = {
                              ...updated[index],
                              notes: e.target.value,
                            };
                            updateField("ingredientGuide", updated);
                          }}
                          placeholder="Notes"
                          className="col-span-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("ingredientGuide", index)
                          }
                          className="col-span-1 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("ingredientGuide", {
                          name: "",
                          amount: "",
                          notes: "",
                        })
                      }
                      className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Ingredient
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Essential Ingredient Guide
                  </label>
                  <div className="space-y-4">
                    {formData.essIngredientGuide?.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-500">
                            Essential Ingredient {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("essIngredientGuide", index)
                            }
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.ingredient}
                          onChange={(e) => {
                            const updated = [
                              ...(formData.essIngredientGuide || []),
                            ];
                            updated[index] = {
                              ...updated[index],
                              ingredient: e.target.value,
                            };
                            updateField("essIngredientGuide", updated);
                          }}
                          placeholder="Ingredient name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const updated = [
                              ...(formData.essIngredientGuide || []),
                            ];
                            updated[index] = {
                              ...updated[index],
                              description: e.target.value,
                            };
                            updateField("essIngredientGuide", updated);
                          }}
                          placeholder="Description"
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                        />
                        <div className="space-y-2">
                          {item.tips?.map((tip, tipIndex) => (
                            <input
                              key={tipIndex}
                              type="text"
                              value={tip}
                              onChange={(e) => {
                                const updated = [
                                  ...(formData.essIngredientGuide || []),
                                ];
                                const updatedTips = [
                                  ...(updated[index].tips || []),
                                ];
                                updatedTips[tipIndex] = e.target.value;
                                updated[index] = {
                                  ...updated[index],
                                  tips: updatedTips,
                                };
                                updateField("essIngredientGuide", updated);
                              }}
                              placeholder="Tip"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [
                                ...(formData.essIngredientGuide || []),
                              ];
                              updated[index] = {
                                ...updated[index],
                                tips: [...(updated[index].tips || []), ""],
                              };
                              updateField("essIngredientGuide", updated);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            + Add tip
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("essIngredientGuide", {
                          ingredient: "",
                          description: "",
                          tips: [],
                        })
                      }
                      className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Essential Ingredient
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions Tab */}
            {activeTab === "instructions" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Instructions
                  </label>
                  <div className="space-y-4">
                    {formData.instructions?.map((instruction, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-500">
                            Step {instruction.step}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("instructions", index)
                            }
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={instruction.title}
                          onChange={(e) => {
                            const updated = [...(formData.instructions || [])];
                            updated[index] = {
                              ...updated[index],
                              title: e.target.value,
                            };
                            updateField("instructions", updated);
                          }}
                          placeholder="Step title"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                        />
                        <textarea
                          value={instruction.description}
                          onChange={(e) => {
                            const updated = [...(formData.instructions || [])];
                            updated[index] = {
                              ...updated[index],
                              description: e.target.value,
                            };
                            updateField("instructions", updated);
                          }}
                          placeholder="Step description"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                        />
                        <input
                          type="url"
                          value={instruction.image || ""}
                          onChange={(e) => {
                            const updated = [...(formData.instructions || [])];
                            updated[index] = {
                              ...updated[index],
                              image: e.target.value,
                            };
                            updateField("instructions", updated);
                          }}
                          placeholder="Step image URL (optional)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        addArrayItem("instructions", {
                          step: (formData.instructions?.length || 0) + 1,
                          title: "",
                          description: "",
                          image: "",
                        })
                      }
                      className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Instruction
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata Tab */}
            {activeTab === "metadata" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author?.name || ""}
                      onChange={(e) =>
                        updateNestedField("author", "name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Avatar URL
                    </label>
                    <input
                      type="url"
                      value={formData.author?.avatar || ""}
                      onChange={(e) =>
                        updateNestedField("author", "avatar", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Bio
                  </label>
                  <textarea
                    value={formData.author?.bio || ""}
                    onChange={(e) =>
                      updateNestedField("author", "bio", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prep Time
                    </label>
                    <input
                      type="text"
                      value={formData.timing?.prep || ""}
                      onChange={(e) =>
                        updateNestedField("timing", "prep", e.target.value)
                      }
                      placeholder="15 mins"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cook Time
                    </label>
                    <input
                      type="text"
                      value={formData.timing?.cook || ""}
                      onChange={(e) =>
                        updateNestedField("timing", "cook", e.target.value)
                      }
                      placeholder="30 mins"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Time
                    </label>
                    <input
                      type="text"
                      value={formData.timing?.total || ""}
                      onChange={(e) =>
                        updateNestedField("timing", "total", e.target.value)
                      }
                      placeholder="45 mins"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.timing?.difficulty || "Easy"}
                      onChange={(e) =>
                        updateNestedField(
                          "timing",
                          "difficulty",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serves
                    </label>
                    <input
                      type="number"
                      value={formData.recipeInfo?.serves || 4}
                      onChange={(e) =>
                        updateNestedField(
                          "recipeInfo",
                          "serves",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calories
                    </label>
                    <input
                      type="number"
                      value={formData.recipeInfo?.calories || 0}
                      onChange={(e) =>
                        updateNestedField(
                          "recipeInfo",
                          "calories",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuisine
                    </label>
                    <input
                      type="text"
                      value={formData.recipeInfo?.cuisine || ""}
                      onChange={(e) =>
                        updateNestedField(
                          "recipeInfo",
                          "cuisine",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Instructions
                    </label>
                    <textarea
                      value={formData.storage || ""}
                      onChange={(e) => updateField("storage", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergy Information
                    </label>
                    <textarea
                      value={formData.allergyInfo || ""}
                      onChange={(e) =>
                        updateField("allergyInfo", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.img || ""}
                      onChange={(e) => updateField("img", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.heroImage || ""}
                      onChange={(e) => updateField("heroImage", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.imageAlt || ""}
                    onChange={(e) => updateField("imageAlt", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Additional Images
                  </label>
                  <div className="space-y-3">
                    {formData.images?.map((image, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => {
                            const updated = [...(formData.images || [])];
                            updated[index] = e.target.value;
                            updateField("images", updated);
                          }}
                          placeholder="Image URL"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem("images", index)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem("images", "")}
                      className="bg-stone-100 border-2 border-dashed border-stone-300 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-stone-100 border-2 border-dashed border-stone-300 px-6 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-stone-200 hover:border-stone-400 transition-colors duration-200"
              >
                Save as Draft
              </button>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {recipe ? "Update Recipe" : "Create Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
