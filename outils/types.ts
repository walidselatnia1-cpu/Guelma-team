// ============================================================================
// CORE INTERFACES - Matching recipe.json structure
// ============================================================================

// Author as embedded object (matches JSON structure)
export interface Author {
  name: string;
  link: string;
  avatar: string;
  bio: string;
}

// Timing as embedded object (matches JSON structure)
export interface Timing {
  prepTime: string;
  cookTime: string;
  totalTime: string;
}

// Recipe info as embedded object (matches JSON structure)
export interface RecipeInfo {
  difficulty: string;
  cuisine: string;
  servings: string;
  dietary?: string;
}

// WhyYouLove as embedded object (matches JSON structure)
export interface WhyYouLove {
  type: string;
  title: string;
  items: string[];
}

// Questions section (matches JSON structure)
export interface Questions {
  title: string;
  items: FAQItem[];
}

// Individual ingredient guide item
export interface IngredientGuideItem {
  ingredient: string;
  description: string;
}

// Essential ingredient guide item
export interface EssentialIngredientGuideItem {
  ingredient: string;
  note: string;
}

// Instruction item
export interface Instruction {
  step: string;
  instruction: string;
}

// Complete process item (matches JSON structure)
export interface CompleteProcessItem {
  title?: string;
  section?: string;
  type?: string;
  description?: string;
  items?: string[];
  after?: string;
}

// Section item (matches JSON structure)
export interface Section {
  title?: string;
  content?: string;
  img?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  items?: string[];
  after?: string;
}

// FAQ item
export interface FAQItem {
  question: string;
  answer: string;
}

// Related recipe item
export interface RelatedRecipe {
  title: string;
  image: string;
  link: string;
}

// Ingredients group (matches JSON structure)
export interface IngredientsGroup {
  section: string;
  items: string[];
}

// ============================================================================
// UI/NAVIGATION INTERFACES
// ============================================================================

export interface NavigationItem {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly iconSrc: string;
  readonly iconClassName: string;
  readonly label?: string;
}

export interface Article {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly name: string;
  readonly alt: string;
  readonly imageSrc: string;
  readonly sizes: string;
  readonly imageClassName: string;
  readonly description: string;
  readonly updatedDate: Date;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  href: string;
  description: string;
  image: string;
  alt: string;
  sizes?: string;
  categoryImage?: string;
  recipeCount?: number; // Number of recipes in this category
}

// ============================================================================
// COMPLEX CATEGORY STRUCTURES (if needed for advanced categorization)
// ============================================================================

interface CategoryHierarchy {
  main: Category;
  sub?: Category;
  tags?: Category[];
}

interface CategoriesSection {
  primary: Category;
  secondary: Category[];
  tags: Category[];
  cuisine?: Category;
  dietary?: Category[];
  mealType?: Category;
  season?: Category;
  difficulty?: Category;
  cookingMethod?: Category;
}

// ============================================================================
// MAIN RECIPE INTERFACE - Consistent with Prisma Schema
// ============================================================================

export interface Recipe {
  // Core fields (exactly as in JSON)
  id: string; // String to match JSON
  slug: string;
  img: string;
  href?: string;
  title: string;
  intro: string;
  description: string;
  shortDescription: string;
  story: string;
  testimonial: string;

  // Category and metadata
  category: string;
  categoryLink: string;
  featuredText: string;
  updatedDate: string;
  createdAt?: string;
  updatedAt?: string;

  // Author as embedded object (matches JSON)
  author: Author;

  // Embedded objects (matches JSON structure)
  whyYouLove?: WhyYouLove;
  timing?: Timing;
  recipeInfo?: RecipeInfo;
  questions?: Questions;

  // Array fields (matches JSON structure)
  essIngredientGuide?: EssentialIngredientGuideItem[];
  ingredientGuide?: IngredientGuideItem[];
  ingredients?: IngredientsGroup[];
  instructions?: Instruction[];
  completeProcess?: CompleteProcessItem[];
  sections?: Section[];
  faq?: FAQItem[];
  relatedRecipes?: RelatedRecipe[];

  // Simple array fields
  mustKnowTips?: string[];
  professionalSecrets?: string[];

  // Media and additional info (exactly as in JSON)
  serving: string;
  storage: string;
  heroImage: string;
  images: string[];
  notes: string[];
  tools: string[];
  allergyInfo: string;
  nutritionDisclaimer: string;

  // Optional fields for UI compatibility
  imageAlt?: string;
  categoryHref?: string;
}

export default Recipe;

// ============================================================================
// TYPE ALIASES AND UTILITY TYPES
// ============================================================================

export type RecipeCreateInput = Omit<Recipe, "id"> & {
  id?: string;
};

export type RecipeUpdateInput = Partial<RecipeCreateInput>;
