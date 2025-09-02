# Image Upload & Storage System

This project now includes a complete image upload and storage system for managing recipe images and other media files.

## Features

### 🚀 Upload API (`/api/upload`)

- **POST**: Upload images with validation (5MB max, JPEG/PNG/WebP/GIF)
- **GET**: List uploaded files by category
- **DELETE**: Remove uploaded files

### 📁 Organized Storage

- Files are stored in `/public/uploads/{category}/`
- Categories: `recipes`, `ingredients`, `authors`, `general`
- Automatic unique filename generation to prevent conflicts

### 🎨 React Components

#### `<FileUpload />`

Drag & drop file upload component with preview

```tsx
<FileUpload
  category="recipes"
  onFileUploaded={(url, filename) => console.log("Uploaded:", url)}
  currentImage="/existing-image.jpg"
  label="Upload Recipe Image"
/>
```

#### `<ImageGallery />`

Gallery view for managing uploaded images

```tsx
<ImageGallery
  category="recipes"
  onImageSelect={(url) => selectImage(url)}
  showSelectButton={true}
/>
```

### 🔧 Custom Hook

`useFileUpload()` provides upload, delete, and list functionality

```tsx
const { uploading, uploadFile, deleteFile, listFiles, error } = useFileUpload();

// Upload a file
const result = await uploadFile(file, "recipes");

// Delete a file
const success = await deleteFile("filename.jpg", "recipes");

// List files
const files = await listFiles("recipes");
```

## Usage in Admin

### Recipe Forms

The `BasicInfoForm` now includes both:

1. **File Upload**: Drag & drop with preview
2. **URL Input**: For external images

### Media Library

Visit `/admin/media` to:

- View all uploaded images by category
- Upload new images
- Delete unwanted files
- Copy image URLs
- Download images

## File Structure

```
public/uploads/
├── recipes/        # Recipe images
├── ingredients/    # Ingredient photos
├── authors/       # Author profile pictures
└── general/       # Other images
```

## API Endpoints

### Upload Image

```bash
POST /api/upload
Content-Type: multipart/form-data

file: [File]
category: "recipes" (optional, defaults to "general")
```

### List Images

```bash
GET /api/upload?category=recipes
```

### Delete Image

```bash
DELETE /api/upload?file=filename.jpg&category=recipes
```

## Security & Validation

- ✅ File type validation (images only)
- ✅ File size limits (5MB max)
- ✅ Unique filename generation
- ✅ Category-based organization
- ✅ Error handling and user feedback

## Integration Notes

- The upload system integrates with existing admin forms
- Recipe images can be uploaded or linked via URL
- All uploaded files are automatically served from `/uploads/`
- The system works seamlessly with the existing recipe management workflow
