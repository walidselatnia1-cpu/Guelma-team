import React, { useState, useEffect } from "react";
import { X, Save, ArrowLeft, ArrowRight } from "lucide-react";
import { Recipe } from "@/outils/types";
import { useAdmin } from "@/contexts/AdminContext";

// Import modular forms
import { BasicInfoForm } from "@/components/admin/forms/BasicInfoForm";
import { AuthorForm } from "@/components/admin/forms/AuthorForm";
import { TimingInfoForm } from "@/components/admin/forms/TimingInfoForm";
import { IngredientsForm } from "@/components/admin/forms/IngredientsForm";
import { InstructionsForm } from "@/components/admin/forms/InstructionsForm";
import { ProcessForm } from "@/components/admin/forms/ProcessForm";
import { SectionsForm } from "@/components/admin/forms/SectionsForm";
import { FAQForm } from "@/components/admin/forms/FAQForm";
import { RelatedRecipesForm } from "@/components/admin/forms/RelatedRecipesForm";
import { EssentialIngredientsForm } from "@/components/admin/forms/EssentialIngredientsForm";
import { WhyYouLoveForm } from "@/components/admin/forms/WhyYouLoveForm";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe?: Recipe | null;
  mode: "add" | "edit";
}

const FORM_STEPS = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Title, intro, image, and basic details",
  },
  { id: "author", title: "Author", description: "Author information and bio" },
  {
    id: "timing",
    title: "Timing & Info",
    description: "Cook times, difficulty, and recipe info",
  },
  {
    id: "whyYouLove",
    title: "Why You'll Love It",
    description: "Compelling reasons to try this recipe",
  },
  {
    id: "ingredients",
    title: "Ingredients",
    description: "Recipe ingredients organized by sections",
  },
  {
    id: "essIngredientGuide",
    title: "Essential Ingredients",
    description: "Key ingredient notes and tips",
  },
  {
    id: "instructions",
    title: "Instructions",
    description: "Step-by-step cooking instructions",
  },
  {
    id: "process",
    title: "Process Steps",
    description: "Visual process breakdown",
  },
  {
    id: "sections",
    title: "Additional Sections",
    description: "Extra content sections and tips",
  },
  { id: "faq", title: "FAQ", description: "Frequently asked questions" },
  {
    id: "related",
    title: "Related Recipes",
    description: "Related and similar recipes",
  },
];

export const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  recipe,
  mode,
}) => {
  const { createRecipe, updateRecipe, loading } = useAdmin();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Recipe>>({});

  useEffect(() => {
    if (recipe && mode === "edit") {
      setFormData(recipe);
    } else {
      // Initialize with default values for add mode
      setFormData({
        id: "",
        slug: "",
        img: "",
        href: "",
        title: "",
        intro: "",
        author: {
          name: "",
          link: "",
          avatar: "",
          bio: "",
        },
        timing: {
          prepTime: "",
          cookTime: "",
          totalTime: "",
        },
        recipeInfo: {
          difficulty: "",
          cuisine: "",
          servings: "",
          dietary: "",
        },
        whyYouLove: {
          type: "Card",
          title: "Why You'll Love It",
          items: [],
        },
        ingredients: [],
        essIngredientGuide: [],
        instructions: [],
        completeProcess: [],
        sections: [],
        questions: {
          title: "Frequently Asked Questions",
          items: [],
        },
        relatedRecipes: [],
      });
    }
  }, [recipe, mode]);

  const handleSave = async () => {
    try {
      const recipeData = {
        ...formData,
        // Generate slug if not provided
        slug:
          formData.slug ||
          formData.title
            ?.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim() ||
          "",
        // Generate href if not provided
        href:
          formData.href ||
          `/recipes/${
            formData.slug ||
            formData.title
              ?.toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .trim()
          }`,
        // Generate ID if not provided (for new recipes)
        id: formData.id || Date.now().toString(),
      } as Recipe;

      if (mode === "edit" && recipe?.id) {
        await updateRecipe(recipe.id, recipeData);
      } else {
        await createRecipe(recipeData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving recipe:", error);
      // You could add error handling UI here
    }
  };

  const updateFormData = (field: keyof Recipe, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderCurrentForm = () => {
    const stepId = FORM_STEPS[currentStep].id;

    switch (stepId) {
      case "basic":
        return (
          <BasicInfoForm
            slug={formData.slug || ""}
            img={formData.img || ""}
            href={formData.href || ""}
            title={formData.title || ""}
            intro={formData.intro || ""}
            onChange={(field, value) =>
              updateFormData(field as keyof Recipe, value)
            }
          />
        );
      case "author":
        return (
          <AuthorForm
            img={recipe?.heroImage}
            author={
              formData.author || { name: "", link: "", avatar: "", bio: "" }
            }
            onChange={(author) => updateFormData("author", author)}
          />
        );
      case "timing":
        return (
          <TimingInfoForm
            timing={
              formData.timing || { prepTime: "", cookTime: "", totalTime: "" }
            }
            recipeInfo={
              formData.recipeInfo || {
                difficulty: "",
                cuisine: "",
                servings: "",
                dietary: "",
              }
            }
            onChange={(field, value) =>
              updateFormData(field as keyof Recipe, value)
            }
          />
        );
      case "whyYouLove":
        return (
          <WhyYouLoveForm
            whyYouLove={
              formData.whyYouLove || {
                type: "Card",
                title: "Why You'll Love It",
                items: [],
              }
            }
            onChange={(whyYouLove) => updateFormData("whyYouLove", whyYouLove)}
          />
        );
      case "ingredients":
        return (
          <IngredientsForm
            ingredients={formData.ingredients || []}
            onChange={(ingredients) =>
              updateFormData("ingredients", ingredients)
            }
          />
        );
      case "essIngredientGuide":
        return (
          <EssentialIngredientsForm
            essIngredientGuide={formData.essIngredientGuide || []}
            onChange={(essIngredientGuide) =>
              updateFormData("essIngredientGuide", essIngredientGuide)
            }
          />
        );
      case "instructions":
        return (
          <InstructionsForm
            instructions={formData.instructions || []}
            onChange={(instructions) =>
              updateFormData("instructions", instructions)
            }
          />
        );
      case "process":
        return (
          <ProcessForm
            process={formData.completeProcess || []}
            onChange={(process) => updateFormData("completeProcess", process)}
          />
        );
      case "sections":
        return (
          <SectionsForm
            sections={formData.sections || []}
            onChange={(sections) => updateFormData("sections", sections)}
          />
        );
      case "faq":
        return (
          <FAQForm
            faq={formData.questions?.items || []}
            onChange={(faq) =>
              updateFormData("questions", {
                title:
                  formData.questions?.title || "Frequently Asked Questions",
                items: faq,
              })
            }
          />
        );
      case "related":
        return (
          <RelatedRecipesForm
            relatedRecipes={formData.relatedRecipes || []}
            onChange={(relatedRecipes) =>
              updateFormData("relatedRecipes", relatedRecipes)
            }
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
        {/* Sidebar with step navigation */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {mode === "edit" ? "Edit Recipe" : "Add New Recipe"}
            </h2>
            <p className="text-sm text-gray-600">
              Complete each section to create a comprehensive recipe.
            </p>
          </div>

          <div className="space-y-2">
            {FORM_STEPS.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = index < currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 border border-blue-200 text-blue-900"
                      : isCompleted
                      ? "bg-green-50 border border-green-200 text-green-900"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">
              Progress: {currentStep + 1} of {FORM_STEPS.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / FORM_STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {FORM_STEPS[currentStep].title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {FORM_STEPS[currentStep].description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {renderCurrentForm()}
          </div>

          {/* Footer with navigation */}
          <div className="p-6 bg-white border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-3">
              {currentStep === FORM_STEPS.length - 1 ? (
                <button
                  onClick={handleSave}
                  disabled={loading || !formData.title}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {loading
                    ? "Saving..."
                    : mode === "edit"
                    ? "Update Recipe"
                    : "Create Recipe"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
