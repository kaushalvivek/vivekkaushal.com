# vivekkaushal.com - Project Documentation

## Project Overview

This is a personal portfolio website built with React and deployed on Netlify. The site showcases projects, research, blog posts, recommendations, and a bucket list. The essays are stored in this repository.

**Tech Stack:**
- React 19.0.0
- Chakra UI for styling and components
- React Router for navigation
- Netlify for hosting and serverless functions

**Live Site:** https://vivekkaushal.com

---

## Project Structure

```
vivekkaushal.com/
├── build/                      # Production build output (generated)
├── public/                     # Static public assets
│   ├── essays/                 # One HTML file per essay, named by slug
│   └── posts/                  # Essay images, one folder per essay slug
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── home.js         # Landing page
│   │   │   ├── Blog.js         # Blog list and routing
│   │   │   ├── BlogPost.js     # Individual blog post viewer
│   │   │   ├── research.js     # Research publications
│   │   │   ├── recommendations.js  # Book recommendations
│   │   │   ├── talk.js         # Contact/talk request form
│   │   │   └── my404.js        # 404 error page
│   │   ├── header.js           # Site header/navigation
│   │   ├── footer.js           # Site footer
│   │   ├── tracker.js          # Analytics tracking
│   │   └── ExternalRedirect.js # External link handler
│   ├── static/
│   │   ├── essays.json         # Essay index: slug, title, date, description
│   │   ├── nonFiction.json     # Book recommendations
│   │   └── avatar.jpg          # Profile image
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # React entry point
│   ├── theme.js                # Chakra UI theme configuration
│   └── config.js               # Site configuration
├── package.json                # Dependencies and scripts
├── netlify.toml                # Netlify configuration
└── CLAUDE.md                   # This file
```

---

## Key Features

### Essays
The essays live in this repository. Nothing is fetched from another service.

- **Index:** `src/static/essays.json` lists each essay's slug, title, date and description, newest first. The home page and the essays list read it.
- **Content:** `public/essays/<slug>.html` holds the body of one essay as plain HTML. The essay page fetches it on demand.
- **Images:** `public/posts/<slug>/` holds the images of one essay.

### Routing
- `/` - Home page
- `/blog` - Blog post list
- `/blog/:slug` - Individual blog post
- `/research` - Research publications
- `/books` - Book recommendations
- `/talk` - Contact form
- `/meet` - Redirects to Calendly (external)
- `/hack` - Legacy redirect to `/blog`

---

## Common Tasks

### 1. Adding an Essay

1. Write the body as plain HTML in `public/essays/<slug>.html`. Use `<p>`, `<h2>`, `<figure>` with `<img>` and `<figcaption>`, `<pre><code>`, and links.
2. Put its images in `public/posts/<slug>/` and reference them as `/posts/<slug>/<file>`.
3. Add an entry at the top of `src/static/essays.json` with `slug`, `title`, `date` (ISO) and `description`.

The slug is the essay's URL: `/blog/<slug>`.

### 2. Development Server

Start the local development server:
```bash
npm start
```

The site will open at http://localhost:3000 with hot reload enabled.

### 3. Building for Production

Create an optimized production build:
```bash
npm run build
```

The build output will be in the `build/` directory and includes:
- Minified and optimized JavaScript/CSS
- `_redirects` file for Netlify routing (SPA support)

### 4. Updating Content

#### Recommendations

Edit `src/static/nonFiction.json`:
```json
[
  {
    "book": "Book Title",
    "author": "Author Name",
    "tags": ["tag1", "tag2", "tag3"]
  }
]
```

**Book Tagging System:**

The book recommendations use a multi-dimensional tagging system designed for discoverability and user-centric search. Tags are organized into three loose dimensions:

**1. Application/Purpose** (What's it useful for?)
- `leadership` - Managing teams, organizational challenges
- `product` - Building/managing products
- `strategy` - Strategic thinking, competitive advantage
- `entrepreneurship` - Starting/building companies
- `self-improvement` - Personal growth, productivity
- `decision-making` - Better choices, cognitive biases
- `systems-thinking` - Understanding complexity
- `management` - Day-to-day management practices

**2. Discipline/Field** (What domain?)
- `psychology` - Human behavior, mind
- `philosophy` - Meaning, ethics, existence
- `history` - Past events, civilizations
- `science` - Research, natural world
- `economics` - Markets, incentives, money
- `technology` - Tech industry, innovation

**3. Format/Style** (How's it presented?)
- `biography` - Life stories (third person)
- `memoir` - Personal narrative (first person)
- `research` - Data-driven, academic

**Tagging Guidelines:**
- Use 1-4 tags per book maximum
- Focus on what visitors would search for, not library categorization
- Combine dimensions for better discoverability (e.g., `["leadership", "memoir", "technology"]`)
- Avoid vague tags - be specific about the book's value
- Tags should describe both content and application

**Examples:**
- "Steve Jobs" → `["biography", "entrepreneurship", "technology"]`
- "Thinking Fast and Slow" → `["psychology", "decision-making", "research"]`
- "The Hard Thing About Hard Things" → `["leadership", "entrepreneurship", "memoir"]`

**Reference:** Tagging system based on research from [LibraryThing](https://www.librarything.com/concepts), [personal knowledge management best practices](https://stangarfield.medium.com/personal-knowledge-management-how-to-do-it-with-25-resources-and-10-books-on-pkm-2adce0e1d05c), and [content taxonomy guidelines](https://www.bynder.com/en/blog/building-digital-asset-library-taxonomy/).

### 5. Styling and Theme

The site uses Chakra UI with a custom theme defined in `src/theme.js`. To modify:

- **Colors:** Edit color schemes in `theme.js`
- **Fonts:** Modify font families and sizes
- **Component Styles:** Chakra UI components can be customized per-component

### 6. Analytics

Analytics tracking is configured in `src/components/tracker.js`. Update tracking IDs in `src/config.js`.

---

## Deployment

The site can be deployed to Netlify in two ways:

### Option 1: Manual Deployment (Recommended Workflow)

Complete deployment sequence using Netlify CLI:

```bash
# 1. Stage your changes
git add <files>

# 2. Commit changes
git commit -m "Your commit message"

# 3. Push to remote
git push origin master

# 4. Build with Netlify
netlify build

# 5. Deploy to production
netlify deploy --prod
```

**Expected behavior:**
- Build time: ~4-5 seconds
- ESLint warnings (unused variables) are normal and non-blocking
- Build output: ~176 KB gzipped
- Deploy uploads only changed files to CDN

### Option 2: Automatic Deployment

Netlify can be configured for automatic deployments:

1. **Automatic Deployments:** Push to `master` branch triggers production build
2. **Preview Deployments:** Pull requests generate preview URLs
3. **Build Command:** `npm run build`
4. **Publish Directory:** `build/`

Note: Manual deployment gives you more control and visibility into the build/deploy process.

### Netlify Configuration

See `netlify.toml` for:
- Build settings
- Redirect rules
- Function configurations
- Environment variables

---

## Development Workflow

### Adding a New Page

1. Create page component in `src/components/pages/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/header.js`
4. Test locally with `npm start`
5. Commit and push to deploy

### Publishing an Essay

1. Add the essay as described in "Adding an Essay"
2. Verify locally: `npm start` and check `/blog`
3. Commit and push
4. Build and deploy: `netlify build && netlify deploy --prod`

### Making Style Changes

1. Edit `src/theme.js` for global theme changes
2. Use Chakra UI props for component-specific styles
3. Test across all pages
4. Check responsive behavior (mobile, tablet, desktop)

---

## Troubleshooting

### An Essay Does Not Show

1. Check that the slug in `src/static/essays.json` matches the file name in `public/essays/`
2. Check the browser console for a failed request to `/essays/<slug>.html`

### Build Failures

1. Clear cache: `rm -rf node_modules package-lock.json && npm install`
2. Check for syntax errors in components
3. Verify all imports are correct
4. Check Netlify build logs for specific errors

### Build Warnings (ESLint)

The build currently produces ESLint warnings for unused variables:
- `src/components/pages/home.js` - unused color variables
- `src/components/pages/recommendations.js` - unused Button import
- `src/components/pages/research.js` - unused SimpleGrid import

**These warnings are non-blocking** and don't prevent deployment. They can be:
- Fixed by removing unused code
- Ignored with `// eslint-disable-next-line` comments
- Left as-is (they don't affect functionality)

### Routing Issues

The site uses client-side routing. The `_redirects` file (generated during build) ensures:
```
/* /index.html 200
```

This tells Netlify to serve `index.html` for all routes, allowing React Router to handle navigation.

---

## Dependencies

### Key Dependencies
- `@chakra-ui/react` - UI component library
- `react-router-dom` - Client-side routing
- `react-markdown` - Markdown rendering
- `date-fns` - Date formatting
- `gray-matter` - Front matter parsing

### Development Dependencies
- `react-scripts` - Build tooling (Create React App)
- `@babel/plugin-proposal-private-property-in-object` - Babel support

---

## Environment & Configuration

### Local Development
- Node.js required (see `package.json` for version compatibility)
- No environment variables needed for basic functionality

### Production (Netlify)
- Build command: `npm run build`
- Publish directory: `build`
- Node version: Specified in `.nvmrc` (if present) or Netlify default

---

## Git Workflow

### Branch Strategy
- `master` - Production branch (auto-deploys)
- Feature branches - For development work
- Pull requests - For code review before merge

### Commit Messages
Follow conventional format:
- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update documentation`
- `style: Update styling`
- `chore: Update dependencies`

### Example Workflow
```bash
git status
git add public/essays public/posts src/static/essays.json
git commit -m "Add essay"
git push origin master
netlify build
netlify deploy --prod
```

---

## Quick Reference

**Start Development:**
```bash
npm start
```

**Deploy to Production (Manual):**
```bash
# Complete deployment sequence
git add <files>
git commit -m "commit message"
git push origin master
netlify build
netlify deploy --prod
```

**Build Only:**
```bash
npm run build
# or
netlify build
```

---

## Contact

For questions about this codebase, refer to the inline code comments or contact Vivek Kaushal via the `/talk` page on the live site.

---

**Last Updated:** December 2025
