# 🍳 Recipes by Clare

A modern, responsive recipe website built with Next.js 15, featuring dynamic content management, SEO optimization, and a beautiful user interface for food enthusiasts.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🎨 **Modern UI/UX**
- Responsive design that works on all devices
- Clean, elegant interface with smooth animations
- Interactive category cards with hover effects
- Dynamic footer with active page highlighting

### 🔍 **SEO Optimized**
- Automatic XML sitemap generation (`/sitemap.xml`)
- Dynamic robots.txt configuration
- Structured data for better search engine visibility
- OpenGraph meta tags for social sharing

### 📱 **User Experience**
- Fast search functionality
- Categorized recipe browsing
- Recipe cards with detailed information
- Interactive navigation with active states
- Loading states and error handling

### ⚖️ **Legal Compliance**
- Privacy Policy page
- Terms & Conditions
- Cookie Policy
- Disclaimer page
- AdSense ready compliance

### 🔧 **Developer Experience**
- TypeScript for type safety
- Component-based architecture
- Centralized configuration management
- Reusable UI components
- Clean code structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/walidselatnia1-cpu/Guelma-team.git
   cd Guelma-team
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── about/            # About page
│   ├── categories/       # Recipe categories
│   ├── contact/          # Contact page
│   ├── recipes/          # Recipe pages
│   ├── search/           # Search functionality
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms & conditions
│   ├── cookies/          # Cookie policy
│   ├── disclaimer/       # Disclaimer
│   ├── sitemap.xml/      # XML sitemap route
│   └── robots.txt/       # Robots.txt route
├── components/            # Reusable UI components
│   ├── main/             # Main page components
│   ├── dashboard/        # Admin dashboard components
│   └── layout/           # Layout components
├── config/               # Configuration files
│   └── site.ts          # Site-wide configuration
├── data/                 # Static data and content
│   ├── categories.ts     # Recipe categories
│   ├── recipes.ts        # Recipe data
│   ├── footerLinks.ts    # Footer navigation
│   └── socialLinks.ts    # Social media links
├── lib/                  # Utility functions
├── outils/              # TypeScript types
└── public/              # Static assets
```

## ⚙️ Configuration

### Site Configuration
Edit `config/site.ts` to customize your site:

```typescript
export const siteConfig = {
  name: "Your Recipe Site",
  domain: "yoursite.com",
  url: "https://yoursite.com",
  email: "contact@yoursite.com",
  description: "Your site description",
  // ... more config
};
```

### Adding New Recipes
1. Add recipe data to `data/recipes.ts`
2. Include proper TypeScript typing
3. Add images to the `public/` directory
4. Recipe will automatically appear in listings

### Adding New Categories
1. Update `data/categories.ts`
2. Category will automatically appear in:
   - Navigation menu
   - Category grid
   - XML sitemap

## 🎯 Key Pages & Routes

| Route | Description | Features |
|-------|-------------|----------|
| `/` | Homepage | Hero section, featured recipes, categories |
| `/recipes` | Recipe listing | Paginated recipe cards, search |
| `/categories` | Category browser | Category grid with descriptions |
| `/categories/[slug]` | Category page | Filtered recipes by category |
| `/recipes/[slug]` | Recipe detail | Full recipe with ingredients & steps |
| `/search` | Search page | Real-time recipe search |
| `/about` | About page | Site information and story |
| `/contact` | Contact page | Contact form and information |
| `/sitemap.xml` | XML Sitemap | SEO sitemap for search engines |
| `/robots.txt` | Robots file | Search engine crawling instructions |

## 🛠️ Built With

### Core Technologies
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript 5.0+](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Utility-first CSS

### UI & Icons
- **[Lucide React](https://lucide.dev/)** - Beautiful icon system
- **Custom CSS** - Category overlays and animations

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast development builds

## 📊 SEO Features

### Automatic XML Sitemap
- Dynamic sitemap generation at `/sitemap.xml`
- Includes all static pages and categories
- Proper priority and change frequency settings
- Automatically updates when content changes

### Robots.txt
- Search engine friendly configuration
- Allows crawling of important pages
- Blocks admin and API routes
- Points to XML sitemap

### Structured Data
- Recipe structured data for rich snippets
- OpenGraph tags for social sharing
- Proper meta descriptions and titles

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure build settings
3. Deploy with zero configuration

### Manual Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in appropriate directories
2. Follow existing TypeScript patterns
3. Update configuration files as needed
4. Test responsive design on multiple devices

## 📄 Legal Pages

The project includes ready-to-use legal pages for compliance:
- **Privacy Policy** (`/privacy`) - GDPR compliant
- **Terms & Conditions** (`/terms`) - Usage terms
- **Cookie Policy** (`/cookies`) - Cookie usage information
- **Disclaimer** (`/disclaimer`) - Legal disclaimers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/walidselatnia1-cpu/Guelma-team/issues)
- **Discussions**: Join discussions in [GitHub Discussions](https://github.com/walidselatnia1-cpu/Guelma-team/discussions)

## 🌟 Acknowledgments

- Built with modern web technologies
- Inspired by contemporary recipe website designs
- Optimized for performance and SEO

---

**Happy Cooking! 👨‍🍳👩‍🍳**
