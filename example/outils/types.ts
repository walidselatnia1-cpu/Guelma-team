// ---------- Core Interfaces ----------

export interface Author {
  name: string;
  link: string;
  avatar: string;
  bio: string;
}

interface Timing {
  prepTime: string;
  cookTime: string;
  totalTime: string;
}

interface RecipeInfo {
  difficulty: string;
  cuisine: string;
  servings: string;
  dietary?: string;
}

interface WhyYouLove {
  type: string;
  title: string;
  items: string[];
}

interface IngredientGuideItem {
  ingredient: string;
  description: string;
}

interface EssentialIngredientGuideItem {
  ingredient: string;
  note: string;
}

interface Instruction {
  step: string;
  instruction: string;
}

interface CompleteProcessItem {
  title?: string;
  section?: string;
  type?: string;
  description?: string;
  items?: string[];
  after?: string;
}

interface Section {
  title?: string;
  content?: string;
  img?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  items?: string[];
  after?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedRecipe {
  title: string;
  image: string;
  link: string;
}

interface IngredientsGroup {
  section: string;
  items: string[];
}

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

// ---------- Main Recipe Interface ----------
export interface Category {
  id: string;
  slug: string;
  title: string; // easier for /categories/[slug] routing
  href: string;
  description: string;
  image: string;
  alt: string;
  sizes?: string; // optional (used in <img sizes>)
}

export interface Recipe {
  href?: string | undefined;
  imageAlt?: string;
  categoryHref?: string | undefined;
  id?: string;
  img?: string;
  title?: string;
  slug?: string;
  intro?: string;
  description?: string;
  shortDescription?: string;
  story?: string;
  testimonial?: string;

  // Metadata
  category?: string;
  categoryLink?: string;
  featuredText?: string;
  author?: Author;
  updatedDate?: string;

  // Categories Section - NEW
  categories?: CategoriesSection;
  categoryHierarchy?: CategoryHierarchy;
  allCategories?: Category[]; // Flat array of all categories for easy access

  // Content
  whyYouLove?: WhyYouLove;
  essIngredientGuide?: EssentialIngredientGuideItem[];
  ingredientGuide?: IngredientGuideItem[];
  ingredients?: IngredientsGroup[];
  instructions?: Instruction[];
  completeProcess?: CompleteProcessItem[];
  sections?: Section[];

  // Extras
  mustKnowTips?: string[];
  professionalSecrets?: string[];
  faq?: FAQItem[];
  questions?: {
    title?: string;
    items?: FAQItem[];
  };

  // Meta info
  serving?: string;
  storage?: string;
  timing?: Timing;
  recipeInfo?: RecipeInfo;

  // Media
  heroImage?: string;
  images?: string[];

  // Add-ons
  notes?: string[];
  tools?: string[];
  allergyInfo?: string;
  nutritionDisclaimer?: string;

  relatedRecipes?: RelatedRecipe[];
}

export default Recipe;
