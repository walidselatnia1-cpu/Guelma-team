# Recipe CRUD Script

A Node.js script to upload images and create recipes via API, replacing the need for admin panel operations.

## Features

- **Image Upload**: Upload multiple images to the API with automatic categorization
- **Recipe Creation**: Create recipes with image references automatically replaced with uploaded URLs
- **Batch Processing**: Handle multiple recipes and images in a single operation
- **Error Handling**: Robust error handling with retry logic
- **Progress Tracking**: Real-time progress updates and colored console output
- **Flexible Input**: Support for JSON files or programmatic usage

## Prerequisites

- Node.js (v14 or higher)
- Access to the recipe API endpoints
- Image files to upload (optional)

## Installation

The script uses existing dependencies from your project. No additional installation required.

## Usage

### Command Line

```bash
# Basic usage - create recipe without images
node recipe-crud-script.js -r sample-recipe.json

# Upload images and create recipe
node recipe-crud-script.js -r sample-recipe.json -i image1.jpg,image2.png,image3.jpg

# Specify category and output file
node recipe-crud-script.js -r sample-recipe.json -i images/ -c recipes -o results.json

# Show help
node recipe-crud-script.js --help
```

### Options

- `-r, --recipe-file <file>`: Path to recipe JSON file (required)
- `-i, --image-files <files>`: Comma-separated list of image files to upload
- `-c, --category <category>`: Image category (default: recipes)
- `-o, --output <file>`: Output file for results
- `-h, --help`: Show help information

### Environment Variables

- `API_BASE_URL`: Base URL for the API (default: http://localhost:3000)

## Recipe JSON Format

Your recipe JSON should follow this structure:

```json
{
  "title": "Recipe Title",
  "category": "Category Name",
  "description": "Recipe description",
  "heroImage": "hero-image.jpg",
  "img": "main-image.jpg",
  "images": ["image1.jpg", "image2.jpg", "image3.jpg"],
  "ingredients": [...],
  "instructions": [...],
  // ... other recipe fields
}
```

The script will automatically replace image filenames with uploaded URLs.

## Examples

### Example 1: Single Recipe with Images

```bash
# Prepare your files
# - recipe.json (your recipe data)
# - hero.jpg, main.jpg, step1.jpg, step2.jpg (your images)

node recipe-crud-script.js \
  -r recipe.json \
  -i hero.jpg,main.jpg,step1.jpg,step2.jpg \
  -c recipes \
  -o created-recipe.json
```

### Example 2: Multiple Recipes

```json
// recipes.json
[
  {
    "title": "Recipe 1",
    "heroImage": "recipe1-hero.jpg"
    // ... other fields
  },
  {
    "title": "Recipe 2",
    "heroImage": "recipe2-hero.jpg"
    // ... other fields
  }
]
```

```bash
node recipe-crud-script.js \
  -r recipes.json \
  -i recipe1-hero.jpg,recipe2-hero.jpg \
  -o batch-results.json
```

### Example 3: Programmatic Usage

```javascript
const { uploadImages, createRecipe } = require("./recipe-crud-script");

// Upload images first
const uploadedImages = await uploadImages(
  ["image1.jpg", "image2.jpg"],
  "recipes"
);

// Create recipe with uploaded image URLs
const recipeData = {
  title: "My Recipe",
  heroImage: "image1.jpg", // Will be replaced with uploaded URL
  // ... other recipe data
};

const result = await createRecipe(recipeData, uploadedImages);
console.log("Created recipe:", result);
```

## API Endpoints Used

- **POST /api/upload**: Upload images

  - Accepts: FormData with `file` and optional `category`
  - Returns: `{ success, url, filename, originalName, size, type, category, uploadedAt }`

- **POST /api/recipe**: Create recipes
  - Accepts: JSON recipe data
  - Returns: Created recipe object

## Error Handling

The script includes comprehensive error handling:

- **Network errors**: Automatic retry with exponential backoff
- **File not found**: Clear error messages for missing files
- **API errors**: Detailed error reporting with status codes
- **Validation errors**: Input validation before API calls

## Output

The script provides colored console output:

- 🔵 **Info**: General information and progress
- 🟢 **Success**: Successful operations
- 🟡 **Warning**: Non-critical issues
- 🔴 **Error**: Failures and errors

Results can be saved to JSON files using the `-o` option.

## Troubleshooting

### Common Issues

1. **"Recipe file not found"**

   - Ensure the recipe JSON file path is correct
   - Use absolute paths or paths relative to the script location

2. **"Image file not found"**

   - Verify image file paths
   - Check file permissions

3. **"API connection failed"**

   - Verify API_BASE_URL environment variable
   - Ensure the API server is running
   - Check network connectivity

4. **"Upload failed"**
   - Check file size limits (max 5MB)
   - Verify supported image formats (JPEG, PNG, WebP, GIF)

### Debug Mode

For additional debugging information, you can modify the script to enable verbose logging by changing the log level in the `log()` function calls.

## Advanced Usage

### Custom Image Processing

You can extend the script to include image processing before upload:

```javascript
// Add to the uploadImage function
const sharp = require("sharp");

// Resize image before upload
const processedBuffer = await sharp(imageBuffer)
  .resize(1200, 800, { fit: "inside" })
  .jpeg({ quality: 85 })
  .toBuffer();
```

### Bulk Operations

For large-scale operations, consider implementing batch processing:

```javascript
// Process recipes in batches
const batchSize = 10;
for (let i = 0; i < recipes.length; i += batchSize) {
  const batch = recipes.slice(i, i + batchSize);
  await processBatch(batch);
}
```

## Security Considerations

- The script currently works with unauthenticated endpoints
- For production use, consider adding authentication tokens
- Validate all input data before processing
- Use HTTPS for API communications in production

## Contributing

To extend the script:

1. Add new functions to the main module
2. Export them in the `module.exports` object
3. Update this README with new features
4. Test thoroughly with various scenarios

## License

This script is part of your project and follows the same license terms.
