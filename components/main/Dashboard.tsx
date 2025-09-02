"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { RecipeTable } from "@/components/dashboard/RecipeTable";
import { RecipeModal } from "@/components/dashboard/RecipeModal";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { Recipe } from "@/outils/types";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";

function AdminDashboardContent() {
  const { state, openCreateModal, openEditModal, closeModal } = useAdmin();
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleAddRecipe = () => {
    openCreateModal();
  };

  const handleEditRecipe = (recipe: Recipe) => {
    openEditModal(recipe);
  };

  const handleDeleteRecipe = (id: string) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      // Implementation would use the deleteRecipe function from context
      console.log("Delete recipe:", id);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard recipes={state.recipes} onEditRecipe={handleEditRecipe} />
        );
      case "recipes":
        return (
          <RecipeTable
            recipes={state.recipes}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            onAdd={handleAddRecipe}
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
      case "media":
        return (
          <div className="space-y-6">
            <MediaLibrary />
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
        return (
          <Dashboard recipes={state.recipes} onEditRecipe={handleEditRecipe} />
        );
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
        isOpen={state.isModalOpen}
        onClose={closeModal}
        recipe={state.selectedRecipe}
        mode={state.modalMode === "create" ? "add" : "edit"}
      />
    </div>
  );
}

function AdminDashboard() {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
}

export default AdminDashboard;
