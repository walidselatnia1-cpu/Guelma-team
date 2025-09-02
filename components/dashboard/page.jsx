"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Download,
  Search,
  Edit3,
  Save,
  X,
  ChefHat,
  Clock,
  Users,
  BarChart3,
  Settings,
  FileText,
  Database,
  Menu,
  Home,
  Filter,
  Eye,
  Calendar,
  Star,
  Moon,
  Sun,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ProfessionalCMS() {
  // ------- STATE -------
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    prepTime: "",
    servings: "",
    difficulty: "Easy",
    category: "Main Course",
    imageUrl: "",
    rating: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [jsonInput, setJsonInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [servingsMin, setServingsMin] = useState("");
  const [servingsMax, setServingsMax] = useState("");
  const [activeTab, setActiveTab] = useState("recipes");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [categories, setCategories] = useState([
    "All",
    "Appetizer",
    "Main Course",
    "Dessert",
    "Beverage",
    "Salad",
    "Soup",
  ]); // Default categories as fallback

  // Fetch dynamic categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const dynamicCategories = await response.json();
          // Add "All" at the beginning and extract category names
          const categoryNames = [
            "All",
            ...dynamicCategories.map((cat) => cat.title),
          ];
          setCategories(categoryNames);
          console.log(
            "📂 Loaded dynamic categories for dashboard:",
            categoryNames
          );
        }
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
        // Keep default categories
      }
    };

    fetchCategories();
  }, []);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "recipes", label: "Recipes", icon: ChefHat },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "categories", label: "Categories", icon: Database },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // ------- INITIAL MOCK & PERSISTENCE -------
  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("recipes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecipes(parsed);
        setFilteredRecipes(parsed);
        return;
      } catch {}
    }
    const mockRecipes = [
      {
        id: 1,
        title: "Classic Margherita Pizza",
        description:
          "A traditional Italian pizza with fresh tomatoes, mozzarella, and basil",
        ingredients:
          "Pizza dough, San Marzano tomatoes, Fresh mozzarella, Fresh basil, Extra virgin olive oil, Salt",
        instructions:
          "Preheat oven to 500°F. Roll out pizza dough. Spread tomato sauce. Add mozzarella. Bake for 10-12 minutes. Top with fresh basil.",
        cookTime: "12",
        prepTime: "20",
        servings: "4",
        difficulty: "Medium",
        category: "Main Course",
        createdAt: "2024-01-15",
        rating: 4.8,
        imageUrl: "",
      },
      {
        id: 2,
        title: "Chocolate Chip Cookies",
        description: "Soft and chewy homemade chocolate chip cookies",
        ingredients:
          "Flour, Butter, Brown sugar, White sugar, Eggs, Vanilla, Chocolate chips, Baking soda, Salt",
        instructions:
          "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Fold in chocolate chips. Bake at 375°F for 9-11 minutes.",
        cookTime: "11",
        prepTime: "15",
        servings: "24",
        difficulty: "Easy",
        category: "Dessert",
        createdAt: "2024-01-10",
        rating: 4.9,
        imageUrl: "",
      },
      {
        id: 3,
        title: "Caesar Salad",
        description:
          "Fresh romaine lettuce with homemade Caesar dressing and croutons",
        ingredients:
          "Romaine lettuce, Parmesan cheese, Croutons, Anchovies, Garlic, Lemon juice, Olive oil, Egg yolk",
        instructions:
          "Wash and chop romaine. Make dressing with anchovies, garlic, lemon. Toss lettuce with dressing. Top with parmesan and croutons.",
        cookTime: "0",
        prepTime: "15",
        servings: "4",
        difficulty: "Easy",
        category: "Salad",
        createdAt: "2024-01-08",
        rating: 4.6,
        imageUrl: "",
      },
    ];
    setRecipes(mockRecipes);
    setFilteredRecipes(mockRecipes);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  // ------- DERIVED -------
  const avgRating = useMemo(() => {
    return recipes.length > 0
      ? (
          recipes.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
          recipes.length
        ).toFixed(1)
      : 0;
  }, [recipes]);

  // ------- FILTER + SORT -------
  useEffect(() => {
    let filtered = recipes.filter((recipe) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        recipe.title.toLowerCase().includes(q) ||
        (recipe.description || "").toLowerCase().includes(q) ||
        (recipe.ingredients || "").toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === "All" || recipe.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === "All" || recipe.difficulty === difficultyFilter;

      const s = Number(recipe.servings) || 0;
      const minOk = servingsMin === "" || s >= Number(servingsMin);
      const maxOk = servingsMax === "" || s <= Number(servingsMax);

      return (
        matchesSearch && matchesCategory && matchesDifficulty && minOk && maxOk
      );
    });

    filtered.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortBy) {
        case "title":
          return dir * a.title.localeCompare(b.title);
        case "rating":
          return dir * ((Number(a.rating) || 0) - (Number(b.rating) || 0));
        case "totalTime": {
          const at =
            parseInt(a.prepTime || "0", 10) + parseInt(a.cookTime || "0", 10);
          const bt =
            parseInt(b.prepTime || "0", 10) + parseInt(b.cookTime || "0", 10);
          return dir * (at - bt);
        }
        case "createdAt":
        default: {
          const ad = new Date(a.createdAt || 0).getTime();
          const bd = new Date(b.createdAt || 0).getTime();
          return dir * (ad - bd);
        }
      }
    });

    setFilteredRecipes(filtered);
  }, [
    recipes,
    searchTerm,
    categoryFilter,
    difficultyFilter,
    servingsMin,
    servingsMax,
    sortBy,
    sortDir,
  ]);

  // ------- HELPERS -------
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const renderStars = (rating, onClick) => {
    const r = Math.round(Number(rating) || 0);
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={onClick ? () => onClick(i + 1) : undefined}
            className={`w-5 h-5 mr-1 ${
              onClick ? "cursor-pointer" : "cursor-default"
            }`}
            aria-label={`Set rating ${i + 1}`}
          >
            <Star
              className={`w-5 h-5 ${
                i < r
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      cookTime: "",
      prepTime: "",
      servings: "",
      difficulty: "Easy",
      category: "Main Course",
      imageUrl: "",
      rating: 0,
    });
    setEditingId(null);
  };

  // ------- HANDLERS -------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    if (editingId) {
      const updatedRecipes = recipes.map((recipe) =>
        recipe.id === editingId
          ? {
              ...recipe,
              ...form,
              id: editingId,
              createdAt: recipes.find((r) => r.id === editingId)?.createdAt,
              rating: Number(form.rating) || 0,
            }
          : recipe
      );
      setRecipes(updatedRecipes);
      setEditingId(null);
    } else {
      const newRecipe = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
        rating: Number(form.rating) || 0,
      };
      setRecipes([newRecipe, ...recipes]);
    }

    resetForm();
    setShowFormModal(false);
  };

  const handleEdit = (recipe) => {
    setForm({ ...recipe });
    setEditingId(recipe.id);
    setShowFormModal(true);
  };

  const handleView = (recipe) => {
    setViewingRecipe(recipe);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      setRecipes(recipes.filter((r) => r.id !== id));
      if (viewingRecipe?.id === id) setShowViewModal(false);
    }
  };

  const handleJsonImport = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const now = new Date().toISOString().split("T")[0];
      if (Array.isArray(jsonData)) {
        const newRecipes = jsonData.map((recipe, index) => ({
          ...recipe,
          id: Date.now() + index,
          createdAt: recipe.createdAt || now,
          rating: Number(recipe.rating) || 0,
        }));
        setRecipes((prev) => [...newRecipes, ...prev]);
      } else {
        const newRecipe = {
          ...jsonData,
          id: Date.now(),
          createdAt: jsonData.createdAt || now,
          rating: Number(jsonData.rating) || 0,
        };
        setRecipes((prev) => [newRecipe, ...prev]);
      }
      setJsonInput("");
      setShowJsonModal(false);
    } catch (error) {
      alert("Invalid JSON format. Please check your input.");
    }
  };

  const handleJsonExport = () => {
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recipes.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!recipes.length) return;
    const headers = Object.keys(recipes[0]);
    const rows = recipes.map((r) =>
      headers.map((h) => JSON.stringify(r[h] ?? ""))
    );
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recipes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // ------- RENDERERS -------
  const SortHeader = ({ label, field }) => (
    <button
      onClick={() => {
        if (sortBy === field) {
          setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
          setSortBy(field);
          setSortDir("asc");
        }
      }}
      className="inline-flex items-center gap-1 hover:underline"
    >
      {label}
      <ArrowUpDown
        className={`w-4 h-4 ${sortBy === field ? "opacity-100" : "opacity-40"}`}
      />
    </button>
  );

  const RecipeRow = ({ recipe }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {recipe.title}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-xs dark:text-gray-400">
              {recipe.description}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
          {recipe.category}
        </span>
      </td>
      <td className="py-3 px-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
            recipe.difficulty
          )}`}
        >
          {recipe.difficulty}
        </span>
      </td>
      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-200">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>
            {parseInt(recipe.prepTime || "0", 10) +
              parseInt(recipe.cookTime || "0", 10)}
            m
          </span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-200">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{recipe.servings}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-1">
          {renderStars(recipe.rating)}
          <span className="text-sm text-gray-600 ml-1 dark:text-gray-300">
            {Number(recipe.rating).toFixed(1)}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(recipe)}
            className="p-1 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-950/40 rounded transition-colors duration-200"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(recipe)}
            className="p-1 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-950/40 rounded transition-colors duration-200"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(recipe.id)}
            className="p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/40 rounded transition-colors duration-200"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Recipes
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {recipes.length}
              </p>
            </div>
            <ChefHat className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Categories
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {categories.length - 1}
              </p>
            </div>
            <Database className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avg Rating
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {avgRating}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This Month
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {
                  recipes.filter((r) =>
                    (r.createdAt || "").startsWith(
                      new Date().toISOString().slice(0, 7)
                    )
                  ).length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Recipes
        </h3>
        <div className="space-y-3">
          {recipes.slice(0, 5).map((recipe) => (
            <div
              key={recipe.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {recipe.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {recipe.category}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {renderStars(recipe.rating)}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {Number(recipe.rating).toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RecipesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Recipe Management
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFormModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Recipe</span>
          </button>
          <button
            onClick={() => setShowJsonModal(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button
            onClick={handleJsonExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={exportCSV}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="lg:col-span-2 relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              {["All", "Easy", "Medium", "Hard"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min servings"
              value={servingsMin}
              onChange={(e) => setServingsMin(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="number"
              placeholder="Max servings"
              value={servingsMax}
              onChange={(e) => setServingsMax(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="lg:col-span-2 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="createdAt">Sort: Date</option>
              <option value="title">Sort: Title</option>
              <option value="rating">Sort: Rating</option>
              <option value="totalTime">Sort: Total Time</option>
            </select>
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {sortDir === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  <SortHeader label="Recipe" field="title" />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Difficulty
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  <SortHeader label="Time" field="totalTime" />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Servings
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  <SortHeader label="Rating" field="rating" />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredRecipes.map((recipe) => (
                <RecipeRow key={recipe.id} recipe={recipe} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add button on mobile */}
      <button
        onClick={() => setShowFormModal(true)}
        className="md:hidden fixed bottom-6 right-6 rounded-full p-4 bg-blue-600 text-white shadow-lg hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );

  const AnalyticsTab = () => {
    const byCategory = useMemo(() => {
      const map = new Map();
      recipes.forEach((r) =>
        map.set(r.category, (map.get(r.category) || 0) + 1)
      );
      return Array.from(map, ([name, value]) => ({ name, value }));
    }, [recipes]);

    const byDifficulty = useMemo(() => {
      const order = ["Easy", "Medium", "Hard"];
      const counts = { Easy: 0, Medium: 0, Hard: 0 };
      recipes.forEach(
        (r) => (counts[r.difficulty] = (counts[r.difficulty] || 0) + 1)
      );
      return order.map((k) => ({ difficulty: k, count: counts[k] || 0 }));
    }, [recipes]);

    const ratingOverTime = useMemo(() => {
      const m = new Map();
      recipes.forEach((r) => {
        const month = (r.createdAt || "").slice(0, 7) || "Unknown"; // YYYY-MM
        const arr = m.get(month) || [];
        arr.push(Number(r.rating) || 0);
        m.set(month, arr);
      });
      const rows = Array.from(m, ([month, arr]) => ({
        month,
        avg: arr.reduce((a, b) => a + b, 0) / arr.length,
      }));
      rows.sort((a, b) => a.month.localeCompare(b.month));
      return rows;
    }, [recipes]);

    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 xl:col-span-1 h-[360px]">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Recipes by Category
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie dataKey="value" data={byCategory} outerRadius={100} label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 xl:col-span-1 h-[360px]">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Difficulty Distribution
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={byDifficulty}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="difficulty" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 xl:col-span-1 h-[360px]">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Average Rating Over Time
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={ratingOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avg" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const CategoriesTab = () => {
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchDetailedCategories = async () => {
        try {
          const response = await fetch("/api/categories");
          if (response.ok) {
            const cats = await response.json();
            setDynamicCategories(cats);
          }
        } catch (error) {
          console.error("Failed to fetch detailed categories:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetailedCategories();
    }, []);

    if (loading) {
      return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading categories...
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recipe Categories
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Categories are automatically generated from your recipe data
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dynamicCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {category.title}
                  </h4>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {category.recipeCount || 0}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
                <a
                  href={category.href}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                >
                  View recipes →
                </a>
              </div>
            ))}
          </div>

          {dynamicCategories.length === 0 && (
            <div className="text-center py-8">
              <Database className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No Categories Found
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                Categories will appear here once you add recipes with category
                information.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Dark Mode
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle dark theme for the dashboard
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {darkMode ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            {darkMode ? "On" : "Off"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Data
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleJsonExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export JSON
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Export CSV
          </button>
          <button
            onClick={() => {
              if (confirm("Clear all recipes? This cannot be undone.")) {
                setRecipes([]);
                localStorage.removeItem("recipes");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === "dashboard") return <Dashboard />;
    if (activeTab === "recipes") return <RecipesTab />;
    if (activeTab === "analytics") return <AnalyticsTab />;
    if (activeTab === "categories") return <CategoriesTab />;
    return <SettingsTab />;
  };

  // ------- UI -------
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-[#0b1020]">
        {/* Sidebar */}
        <div
          className={`bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 flex flex-col ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Recipe CMS
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin Panel
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        active
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {!sidebarCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full hidden md:flex items-center justify-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              {darkMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  {activeTab}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your recipe collection
                </p>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
        </div>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showFormModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {editingId ? "Edit Recipe" : "Add New Recipe"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowFormModal(false);
                        resetForm();
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Recipe Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Enter recipe title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Brief description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image URL (optional)
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-gray-100"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Prep Time (min)
                      </label>
                      <input
                        type="number"
                        name="prepTime"
                        value={form.prepTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-gray-100"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cook Time (min)
                      </label>
                      <input
                        type="number"
                        name="cookTime"
                        value={form.cookTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-gray-100"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Servings
                      </label>
                      <input
                        type="number"
                        name="servings"
                        value={form.servings}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-gray-100"
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Difficulty
                      </label>
                      <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                      >
                        {categories.slice(1).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ingredients (comma separated)
                    </label>
                    <textarea
                      name="ingredients"
                      value={form.ingredients}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:bg-gray-800 dark:text-gray-100"
                      placeholder="List ingredients separated by commas"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Instructions
                    </label>
                    <textarea
                      name="instructions"
                      value={form.instructions}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Step-by-step cooking instructions"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rating
                    </label>
                    {renderStars(form.rating, (val) =>
                      setForm((f) => ({ ...f, rating: val }))
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => {
                        setShowFormModal(false);
                        resetForm();
                      }}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingId ? "Update" : "Save"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Modal */}
        <AnimatePresence>
          {showViewModal && viewingRecipe && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {viewingRecipe.imageUrl ? (
                      <img
                        src={viewingRecipe.imageUrl}
                        alt={viewingRecipe.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <ChefHat className="w-7 h-7 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {viewingRecipe.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {viewingRecipe.category} • {viewingRecipe.difficulty}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <p className="text-gray-700 dark:text-gray-200">
                      {viewingRecipe.description}
                    </p>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Ingredients
                      </h3>
                      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-1">
                        {(viewingRecipe.ingredients || "")
                          .split(",")
                          .map((ing, i) => (
                            <li key={i}>{ing.trim()}</li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Instructions
                      </h3>
                      <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-200 space-y-2">
                        {(viewingRecipe.instructions || "")
                          .split(".")
                          .filter(Boolean)
                          .map((step, i) => (
                            <li key={i}>{step.trim()}.</li>
                          ))}
                      </ol>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(
                            viewingRecipe.difficulty
                          )}`}
                        >
                          {viewingRecipe.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {viewingRecipe.createdAt}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {parseInt(viewingRecipe.prepTime || "0", 10) +
                            parseInt(viewingRecipe.cookTime || "0", 10)}
                          m
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {viewingRecipe.servings}
                        </div>
                      </div>
                      <div className="mt-3">
                        {renderStars(viewingRecipe.rating)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowViewModal(false);
                          handleEdit(viewingRecipe);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(viewingRecipe.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* JSON Import Modal */}
        <AnimatePresence>
          {showJsonModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Import JSON Data
                    </h2>
                    <button
                      onClick={() => setShowJsonModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:bg-gray-800 dark:text-gray-100"
                    placeholder='[{"title":"...","description":"...","prepTime":"10",...}] or single object'
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-800 p-6">
                  <button
                    onClick={() => setShowJsonModal(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleJsonImport}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Import</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
