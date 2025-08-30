"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { RecipeTable } from "@/components/dashboard/RecipeTable";
import { RecipeModal } from "@/components/dashboard/RecipeModal";
import { Recipe } from "@/outils/types";
import { sampleRecipes } from "@/data/sampleRecipes";

function AdminDashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | undefined>();

  const handleAddRecipe = () => {
    setEditingRecipe(undefined);
    setIsModalOpen(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = (id: string) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    if (editingRecipe) {
      // Update existing recipe
      setRecipes((prev) => prev.map((r) => (r.id === recipe.id ? recipe : r)));
    } else {
      // Add new recipe
      setRecipes((prev) => [...prev, recipe]);
    }
    setIsModalOpen(false);
    setEditingRecipe(undefined);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(undefined);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard recipes={recipes} onEditRecipe={handleEditRecipe} />;
      case "recipes":
        return (
          <RecipeTable
            recipes={recipes}
            onEditRecipe={handleEditRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        );
      case "categories":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Categories
              </h1>
              <p className="text-gray-600">
                Manage recipe categories and organization
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">
                Categories management coming soon...
              </p>
            </div>
          </div>
        );
      case "authors":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Authors</h1>
              <p className="text-gray-600">
                Manage recipe authors and contributors
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Authors management coming soon...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Settings
              </h1>
              <p className="text-gray-600">Configure your CMS preferences</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard recipes={recipes} onEditRecipe={handleEditRecipe} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onAddRecipe={handleAddRecipe}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>

      <RecipeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecipe}
        recipe={editingRecipe}
      />
    </div>
  );
}

export default AdminDashboard;
