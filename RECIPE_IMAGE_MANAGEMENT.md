# Recipe Image Management Features

## Overview

The admin panel now includes comprehensive image management features that allow you to:

- Upload images and automatically link them to recipes
- View which images are used by which recipes
- Bulk manage image assignments
- Link existing images to recipes

## New Features Added

### 1. **Automatic Recipe Linking on Upload**

When uploading images in the "recipes" category, you'll now get an option to immediately link the uploaded image to a recipe.

**How to use:**

1. Go to Admin → Media Library
2. Select "Recipe Images" category
3. Upload an image
4. A modal will appear asking which recipe to link it to
5. Choose the image type (main, hero, or additional)
6. Select the target recipe

### 2. **Image Usage Overview**

A new "Image Usage" tab in the Media Library shows:

- Which images are used by which recipes
- Image type assignments (main, hero, additional)
- Unused images that can be cleaned up
- Statistics on image usage

**How to access:**

- Admin → Media Library → "Image Usage" tab

### 3. **Enhanced Image Gallery**

The image gallery now includes:

- Link buttons on each image to assign them to recipes
- Visual indicators showing which images are linked
- One-click linking to recipes

### 4. **Recipe Image Manager Improvements**

The recipe editing interface now includes:

- Quick link buttons next to upload buttons
- Better organization of image types
- Visual indicators for image assignments

## Image Types Explained

### Main Image (`img`)

- **Purpose**: Primary recipe photo shown in recipe cards and listings
- **Required**: Yes, every recipe should have a main image
- **Recommended**: High-quality, appetizing photo of the finished dish

### Hero Image (`heroImage`)

- **Purpose**: Large banner image displayed at the top of recipe pages
- **Required**: No, optional for featured recipes
- **Recommended**: Wide-format, high-resolution image (1200px+ width)

### Additional Images (`images[]`)

- **Purpose**: Step-by-step photos, ingredient shots, process images
- **Required**: No, but recommended for complex recipes
- **Types**: Process shots, ingredient layouts, variations, serving suggestions

## API Updates

### Recipe API Enhancement

The `/api/recipe` endpoint now supports querying by slug:

```
GET /api/recipe?slug=recipe-slug-name
```

### Image Assignment

Images can be assigned to recipes by updating the recipe object:

```javascript
PUT /api/recipe
{
  "id": "recipe-id",
  "img": "/uploads/recipes/main-image.jpg",      // Main image
  "heroImage": "/uploads/recipes/hero.jpg",      // Hero image
  "images": [                                    // Additional images
    "/uploads/recipes/step1.jpg",
    "/uploads/recipes/step2.jpg"
  ]
}
```

## Usage Examples

### 1. **Upload and Link New Image**

```
1. Admin → Media Library → "Recipe Images"
2. Click "Upload Images"
3. Drag/drop or select image file
4. Modal appears → Select recipe and image type
5. Click "Link Image to Recipe"
```

### 2. **Link Existing Image to Recipe**

```
1. Admin → Media Library → Gallery view
2. Find your image → Click "Link" button
3. Search for target recipe
4. Select image type (main/hero/additional)
5. Click "Link Image to Recipe"
```

### 3. **View Image Usage**

```
1. Admin → Media Library → "Image Usage" tab
2. See all images and their assignments
3. Use search to find specific images/recipes
4. Click "Unlink" to remove assignments
```

### 4. **Bulk Image Management**

```
1. Admin → Media Library → "Image Usage" tab
2. Identify unused images (red counter)
3. Clean up or assign unused images
4. Monitor image usage statistics
```

## File Structure

```
components/admin/
├── RecipeImageLinker.tsx      # Modal for linking images to recipes
├── ImageUsageViewer.tsx       # Overview of image assignments
├── QuickImageSelector.tsx     # Quick image picker modal
├── RecipeImageManager.tsx     # Enhanced recipe image management
├── ImageGallery.tsx          # Enhanced with linking features
└── FileUpload.tsx            # Enhanced with auto-linking
```

## Benefits

- **Streamlined Workflow**: Upload and assign images in one step
- **Better Organization**: See exactly which images are used where
- **Reduced Errors**: Prevent orphaned or missing images
- **Bulk Operations**: Manage multiple image assignments efficiently
- **Visual Feedback**: Clear indicators of image usage and assignments
