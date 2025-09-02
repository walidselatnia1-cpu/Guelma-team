# Progressive Features - Add Data Without Rebuilding

This project now includes Incremental Static Regeneration (ISR) and on-demand revalidation features that allow you to add data to the database without needing to rebuild the entire application.

## 🚀 Features Added

### 1. Incremental Static Regeneration (ISR)

- **Home Page**: Revalidates every 5 minutes
- **Recipe Pages**: Revalidate every 2 minutes
- **API Routes**: Revalidate every 1-5 minutes depending on data type
- **Category Pages**: Revalidate every 2 minutes

### 2. On-Demand Revalidation

- Trigger immediate cache invalidation after data changes
- Supports both path-based and tag-based revalidation
- Webhook integration for automatic revalidation

### 3. Cache Tags

- `recipes`: All recipe-related content
- `categories`: Category listings and pages
- `trending`: Trending recipes section
- `latest`: Latest recipes section
- `category-{name}`: Specific category content

## 🔧 Setup

1. **Environment Variables** (add to `.env.local`):

```bash
# Required for revalidation
REVALIDATE_SECRET=your-secure-revalidation-secret
WEBHOOK_SECRET=your-secure-webhook-secret
ADMIN_SECRET=your-admin-secret

# Your app URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

2. **In Production**, set these environment variables in your deployment platform (Vercel, Netlify, etc.)

## 📝 Usage

### Method 1: Manual Revalidation (Admin Panel)

**Endpoint**: `POST /api/admin/revalidate`

```javascript
// Revalidate after adding a new recipe
fetch("/api/admin/revalidate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    admin_secret: "your-admin-secret",
    action: "new-recipe",
    recipe_category: "desserts",
  }),
});

// Revalidate after updating a recipe
fetch("/api/admin/revalidate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    admin_secret: "your-admin-secret",
    action: "update-recipe",
    recipe_slug: "chocolate-cake",
    recipe_category: "desserts",
  }),
});

// Revalidate everything
fetch("/api/admin/revalidate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    admin_secret: "your-admin-secret",
    action: "all",
  }),
});
```

### Method 2: Webhook Integration (Automatic)

**Endpoint**: `POST /api/webhook/recipe-updated`

Set up your database or CMS to call this webhook after recipe changes:

```javascript
// Call after creating a new recipe
fetch("/api/webhook/recipe-updated", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "created",
    recipe_slug: "new-recipe-slug",
    recipe_category: "main-dishes",
    webhook_secret: "your-webhook-secret",
  }),
});

// Call after updating a recipe
fetch("/api/webhook/recipe-updated", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "updated",
    recipe_slug: "updated-recipe-slug",
    recipe_category: "main-dishes",
    webhook_secret: "your-webhook-secret",
  }),
});

// Call after deleting a recipe
fetch("/api/webhook/recipe-updated", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "deleted",
    recipe_slug: "deleted-recipe-slug",
    recipe_category: "main-dishes",
    webhook_secret: "your-webhook-secret",
  }),
});
```

### Method 3: Direct Revalidation API

**Endpoint**: `POST /api/revalidate`

```javascript
// Revalidate specific paths
fetch("/api/revalidate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    secret: "your-revalidate-secret",
    type: "path",
    path: "/recipes",
  }),
});

// Revalidate by cache tag
fetch("/api/revalidate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    secret: "your-revalidate-secret",
    type: "tag",
    tag: "recipes",
  }),
});

// Revalidate defaults (home, recipes, categories, etc.)
fetch("/api/revalidate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    secret: "your-revalidate-secret",
  }),
});
```

### Method 4: Programmatic (In Code)

```javascript
import {
  revalidateAfterNewRecipe,
  revalidateAfterRecipeUpdate,
} from "@/data/data";

// After adding a new recipe
await revalidateAfterNewRecipe("desserts");

// After updating a recipe
await revalidateAfterRecipeUpdate("chocolate-cake", "desserts");
```

## 🔍 How It Works

1. **Build Time**: Static pages are generated with real database data
2. **Runtime**: Pages serve from cache until revalidation time expires
3. **Background**: When revalidation time expires, Next.js regenerates the page in the background
4. **Immediate**: On-demand revalidation triggers immediate cache invalidation

## 📊 Benefits

- ✅ **No Rebuilds Required**: Add data instantly without waiting for builds
- ✅ **Fast Performance**: Static pages served from cache
- ✅ **Real-time Updates**: On-demand revalidation for immediate updates
- ✅ **Automatic Fallback**: ISR ensures content is never stale for too long
- ✅ **Selective Updates**: Only revalidate what changed

## 🔧 Integration Examples

### With Prisma Studio

After adding/editing a recipe in Prisma Studio, call the webhook or admin API.

### With Custom Admin Panel

Add revalidation calls to your admin panel's create/update/delete operations.

### With Headless CMS

Configure webhooks in your CMS to call the revalidation endpoints.

### With Database Triggers

Set up database triggers to call the webhook after INSERT/UPDATE/DELETE operations.

## 🎯 Next Steps

1. Set up environment variables
2. Test the revalidation endpoints
3. Integrate with your data entry workflow
4. Monitor revalidation in your deployment logs
5. Adjust revalidation timers based on your needs

Your app now supports progressive data updates! 🚀
