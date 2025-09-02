# Recipe Image Linking Guide

This guide explains how to properly link images when adding recipes to your application.

## 🎯 Overview

When creating a recipe, you can associate multiple types of images:

1. **Main Image** (`img`) - Primary recipe photo (required)
2. **Hero Image** (`heroImage`) - Large banner image (optional)
3. **Additional Images** (`images[]`) - Step photos, ingredients, variations (optional)

## 🔄 Complete Workflow

### Method 1: Upload First, Then Create Recipe

This is the **recommended approach** for new images:

```tsx
// 1. Upload images to get URLs
const uploadMainImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", "recipes");

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result.url; // e.g., "/uploads/recipes/123456-main.jpg"
};

// 2. Create recipe with image URLs
const createRecipe = async (imageUrls: {
  main: string;
  hero?: string;
  additional?: string[];
}) => {
  const recipeData = {
    title: "Honey Sesame Chicken",
    intro: "A delicious sweet and savory dish...",
    category: "dinner",

    // Image linking - key part!
    img: imageUrls.main, // Main image (required)
    heroImage: imageUrls.hero || imageUrls.main, // Hero or fallback to main
    images: [
      imageUrls.main, // Always include main
      ...(imageUrls.hero ? [imageUrls.hero] : []), // Add hero if different
      ...(imageUrls.additional || []), // Add additional images
    ].filter(Boolean),

    // ... other recipe data
  };

  const response = await fetch("/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  });

  return await response.json();
};
```

### Method 2: Use Existing Images

If images are already uploaded, reference them by URL:

```tsx
const createRecipeWithExistingImages = async () => {
  const recipeData = {
    title: "Classic Pasta",
    intro: "Traditional Italian pasta recipe...",
    category: "dinner",

    // Reference existing images
    img: "/uploads/recipes/pasta-main.jpg",
    heroImage: "/uploads/recipes/pasta-hero.jpg",
    images: [
      "/uploads/recipes/pasta-main.jpg",
      "/uploads/recipes/pasta-hero.jpg",
      "/uploads/recipes/pasta-step1.jpg",
      "/uploads/recipes/pasta-step2.jpg",
    ],

    // ... other data
  };

  // Create recipe
  const response = await fetch("/api/recipe", {
    /* ... */
  });
  return await response.json();
};
```

## 🛠️ Using React Components

### Enhanced BasicInfoForm with Image Manager

```tsx
import { BasicInfoFormEnhanced } from "@/components/admin/forms/BasicInfoFormEnhanced";

const RecipeCreatePage = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    intro: "",
    img: "",
    heroImage: "",
    images: [],
    // ... other fields
  });

  const handleFieldChange = (field: string, value: any) => {
    setRecipeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // All images are already linked via the form
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    const recipe = await response.json();
    console.log("Recipe created:", recipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <BasicInfoFormEnhanced
        title={recipeData.title}
        intro={recipeData.intro}
        img={recipeData.img}
        heroImage={recipeData.heroImage}
        images={recipeData.images}
        onChange={handleFieldChange}
      />

      <button type="submit">Create Recipe</button>
    </form>
  );
};
```

### Direct RecipeImageManager Usage

```tsx
import { RecipeImageManager } from "@/components/admin/RecipeImageManager";

const ImageManagement = () => {
  const [images, setImages] = useState({
    main: "",
    hero: "",
    additional: [],
  });

  return (
    <RecipeImageManager
      mainImage={images.main}
      heroImage={images.hero}
      additionalImages={images.additional}
      onMainImageChange={(url) => setImages((prev) => ({ ...prev, main: url }))}
      onHeroImageChange={(url) => setImages((prev) => ({ ...prev, hero: url }))}
      onAdditionalImagesChange={(urls) =>
        setImages((prev) => ({ ...prev, additional: urls }))
      }
    />
  );
};
```

## 📡 API Integration

### Upload API (`/api/upload`)

**Upload Image:**

```bash
POST /api/upload
Content-Type: multipart/form-data

file: [File object]
category: "recipes" (optional)
```

**Response:**

```json
{
  "success": true,
  "url": "/uploads/recipes/timestamp-filename.jpg",
  "filename": "timestamp-filename.jpg",
  "originalName": "my-recipe.jpg",
  "size": 204800,
  "type": "image/jpeg",
  "category": "recipes",
  "uploadedAt": "2025-09-01T12:00:00.000Z"
}
```

### Recipe API (`/api/recipe`)

**Create Recipe with Images:**

```bash
POST /api/recipe
Content-Type: application/json

{
  "title": "My Recipe",
  "intro": "Recipe description...",
  "img": "/uploads/recipes/main-image.jpg",        // Required
  "heroImage": "/uploads/recipes/hero-image.jpg",  // Optional
  "images": [                                      // Optional array
    "/uploads/recipes/main-image.jpg",
    "/uploads/recipes/step1.jpg",
    "/uploads/recipes/step2.jpg"
  ],
  "category": "dinner",
  // ... other fields
}
```

## 🎨 Image Categories

Images are organized by category in the upload system:

- **`recipes`** - Main recipe photos, step images
- **`ingredients`** - Individual ingredient photos
- **`authors`** - Chef/author profile pictures
- **`general`** - Other images

## 💡 Best Practices

### Image Relationships

1. **Always include main image in images array**

   ```tsx
   images: [mainImage, heroImage, ...additionalImages].filter(Boolean);
   ```

2. **Use hero image as fallback**

   ```tsx
   heroImage: heroImageUrl || mainImageUrl;
   ```

3. **Validate image existence**
   ```tsx
   if (!mainImageUrl) {
     throw new Error("Main image is required");
   }
   ```

### File Organization

- Use consistent naming: `recipe-name-main.jpg`, `recipe-name-step1.jpg`
- Keep images in appropriate categories
- Use descriptive filenames for better management

### Error Handling

```tsx
const createRecipeWithErrorHandling = async (recipeData: any) => {
  try {
    // Validate required images
    if (!recipeData.img) {
      throw new Error("Main image is required");
    }

    // Create recipe
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create recipe");
    }

    return await response.json();
  } catch (error) {
    console.error("Recipe creation failed:", error);
    throw error;
  }
};
```

## 🔧 Utility Service

Use the `RecipeCreationService` for streamlined creation:

```tsx
import { RecipeCreationService } from '@/lib/recipe-creation-service';

// Upload files and create recipe in one call
const recipe = await RecipeCreationService.createRecipeWithUpload({
  title: "My Recipe",
  intro: "Description...",
  category: "dinner",
  mainImageFile: mainFile,           // File object
  heroImageFile: heroFile,           // File object
  additionalImageFiles: [step1File, step2File], // File objects
  ingredients: [...],
  instructions: [...]
});
```

## 📱 Frontend Implementation

### Complete Form Example

```tsx
const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    intro: "",
    img: "",
    heroImage: "",
    images: [],
    category: "dinner",
    // ... other fields
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File, imageType: string) => {
    setUploading(true);
    try {
      const result = await uploadImage(file, "recipes");
      if (result.success) {
        if (imageType === "main") {
          setRecipe((prev) => ({ ...prev, img: result.url }));
        } else if (imageType === "hero") {
          setRecipe((prev) => ({ ...prev, heroImage: result.url }));
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Ensure images array includes all uploaded images
      const recipeData = {
        ...recipe,
        images: [recipe.img, recipe.heroImage, ...recipe.images].filter(
          (img, index, arr) => img && arr.indexOf(img) === index
        ), // Remove duplicates
      };

      const createdRecipe = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      }).then((res) => res.json());

      console.log("Recipe created with linked images:", createdRecipe);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div>
      {/* Use the enhanced components */}
      <BasicInfoFormEnhanced
        {...recipe}
        onChange={(field, value) =>
          setRecipe((prev) => ({ ...prev, [field]: value }))
        }
      />

      <button onClick={handleSubmit} disabled={uploading}>
        {uploading ? "Uploading..." : "Create Recipe"}
      </button>
    </div>
  );
};
```

This system provides a complete solution for linking images to recipes with proper organization, validation, and user experience.
