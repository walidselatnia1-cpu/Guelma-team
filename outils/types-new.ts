// ============================================================================
// CORE INTERFACES - Consistent with Prisma Schema
// ============================================================================

export interface Author {
  id: string;
  name: string;
  link: string;
  avatar: string;
  bio: string;
  recipes?: Recipe[];
}

export interface Timing {
  id: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  recipe?: Recipe;
  recipeId?: number;
}

export interface RecipeInfo {
  id: string;
  difficulty: string;
  cuisine: string;
  servings: string;
  dietary?: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface WhyYouLove {
  id: string;
  type: string;
  title: string;
  items: string[];
  recipe?: Recipe;
  recipeId?: string;
}

export interface IngredientGuideItem {
  id: string;
  ingredient: string;
  description: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface EssentialIngredientGuideItem {
  id: string;
  ingredient: string;
  note: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface Instruction {
  id: string;
  step: string;
  instruction: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface CompleteProcessItem {
  id: string;
  title?: string;
  section?: string;
  type?: string;
  description?: string;
  items: string[];
  after?: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface Section {
  id: string;
  title?: string;
  content?: string;
  img?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  items: string[];
  after?: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface RelatedRecipe {
  id: string;
  title: string;
  image: string;
  link: string;
  recipe?: Recipe;
  recipeId?: string;
}

export interface IngredientsGroup {
  id: string;
  section: string;
  items: string[];
  recipe?: Recipe;
  recipeId?: string;
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
  // Core fields matching Prisma schema
  id: number; // Changed to number to match Prisma Int
  slug: string;
  href?: string;
  imageAlt: string;
  categoryHref?: string;
  img: string;
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

  // Author relation
  authorId: string;
  author?: Author;

  // Core recipe data relations
  whyYouLove?: WhyYouLove;
  essIngredientGuide?: EssentialIngredientGuideItem[];
  ingredientGuide?: IngredientGuideItem[];
  ingredients?: IngredientsGroup[];
  instructions?: Instruction[];
  completeProcess?: CompleteProcessItem[];
  sections?: Section[];
  faq?: FAQItem[];
  relatedRecipes?: RelatedRecipe[];
  timing?: Timing;
  recipeInfo?: RecipeInfo;

  // Additional fields from schema
  mustKnowTips: string[];
  professionalSecrets: string[];
  faqExtraTitle?: string;
  faqExtraItems: FAQItem[];

  serving: string;
  storage: string;
  heroImage: string;
  images: string[];
  notes: string[];
  tools: string[];
  allergyInfo: string;
  nutritionDisclaimer: string;

  // Optional UI/legacy fields (for backward compatibility)
  categories?: CategoriesSection;
  categoryHierarchy?: CategoryHierarchy;
  allCategories?: Category[];
  questions?: {
    title?: string;
    items?: FAQItem[];
  };
}

export default Recipe;

// ============================================================================
// TYPE ALIASES AND UTILITY TYPES
// ============================================================================

export type RecipeWithAllRelations = Recipe & {
  author: Author;
  whyYouLove: WhyYouLove;
  essIngredientGuide: EssentialIngredientGuideItem[];
  ingredientGuide: IngredientGuideItem[];
  ingredients: IngredientsGroup[];
  instructions: Instruction[];
  completeProcess: CompleteProcessItem[];
  sections: Section[];
  faq: FAQItem[];
  relatedRecipes: RelatedRecipe[];
  timing: Timing;
  recipeInfo: RecipeInfo;
};

export type RecipeCreateInput = Omit<Recipe, "id" | "author" | "authorId"> & {
  authorId: string;
};

export type RecipeUpdateInput = Partial<RecipeCreateInput>;
