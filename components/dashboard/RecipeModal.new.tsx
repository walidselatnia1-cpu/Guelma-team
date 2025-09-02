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
        id: Date.now().toString(),
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
        href: formData.href || `/recipes/${formData.slug}`,
      } as Recipe;

      if (mode === "edit" && recipe?.id) {
        await updateRecipe(recipe.id, recipeData);
      } else {
        await createRecipe(recipeData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving recipe:", error);
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
            title={formData.title || ""}
            intro={formData.intro || ""}
            img={formData.img || ""}
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
            onTimingChange={(timing) => updateFormData("timing", timing)}
            onRecipeInfoChange={(recipeInfo) =>
              updateFormData("recipeInfo", recipeInfo)
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === "edit" ? "Edit Recipe" : "Add New Recipe"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {FORM_STEPS[currentStep].description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {FORM_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    index === currentStep
                      ? "bg-blue-600 text-white"
                      : index < currentStep
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className="block">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {renderCurrentForm()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {FORM_STEPS.length}
              </span>

              {currentStep === FORM_STEPS.length - 1 ? (
                <button
                  onClick={handleSave}
                  disabled={loading || !formData.title}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  disabled={currentStep === FORM_STEPS.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
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
