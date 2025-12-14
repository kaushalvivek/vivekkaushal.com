# vivekkaushal.com - Project Documentation

## Project Overview

This is a personal portfolio website built with React and deployed on Netlify. The site showcases projects, research, blog posts, recommendations, and a bucket list. The blog content is sourced from Substack via RSS feed.

**Tech Stack:**
- React 19.0.0
- Chakra UI for styling and components
- React Router for navigation
- Netlify for hosting and serverless functions
- Substack for blog content (external)

**Live Site:** https://vivekkaushal.com

---

## Project Structure

```
vivekkaushal.com/
├── api/                        # Netlify serverless functions
│   └── blog.js                 # RSS feed proxy endpoint
├── build/                      # Production build output (generated)
├── public/                     # Static public assets
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── home.js         # Landing page
│   │   │   ├── Blog.js         # Blog list and routing
│   │   │   ├── BlogPost.js     # Individual blog post viewer
│   │   │   ├── projects.js     # Projects showcase
│   │   │   ├── research.js     # Research publications
│   │   │   ├── recommendations.js  # Book/media recommendations
│   │   │   ├── bucketlist.js   # Travel bucket list
│   │   │   ├── talk.js         # Contact/talk request form
│   │   │   └── my404.js        # 404 error page
│   │   ├── header.js           # Site header/navigation
│   │   ├── footer.js           # Site footer
│   │   ├── tracker.js          # Analytics tracking
│   │   └── ExternalRedirect.js # External link handler
│   ├── static/
│   │   ├── blog-feed.xml       # Cached Substack RSS feed
│   │   ├── projects.json       # Project data
│   │   ├── nonFiction.json     # Book recommendations
│   │   ├── bucketList.json     # Bucket list items
│   │   └── avatar.jpg          # Profile image
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # React entry point
│   ├── theme.js                # Chakra UI theme configuration
│   └── config.js               # Site configuration
├── update-blog-feed.js         # Script to fetch latest blog posts
├── package.json                # Dependencies and scripts
├── netlify.toml                # Netlify configuration
└── CLAUDE.md                   # This file
```

---

## Key Features

### Blog System
The blog content is fetched from Substack (https://vivekkaushal.substack.com) and cached locally:

- **Static Feed:** `src/static/blog-feed.xml` - Cached RSS feed for fast loading
- **API Proxy:** `api/blog.js` - Serverless function to fetch fresh feed on demand
- **Blog Component:** Parses XML feed and displays posts with routing for individual posts

### Routing
- `/` - Home page
- `/blog` - Blog post list
- `/blog/:slug` - Individual blog post
- `/projects` - Projects showcase
- `/research` - Research publications
- `/recommendations` - Book and media recommendations
- `/bucketlist` - Travel bucket list
- `/talk` - Contact form
- `/meet` - Redirects to Calendly (external)
- `/hack` - Legacy redirect to `/blog`

---

## Common Tasks

### 1. Refreshing the Blog Feed

When you publish a new post on Substack, update the cached feed file:

```bash
npm run update-blog
```

This script:
1. Fetches the latest RSS feed from `https://vivekkaushal.substack.com/feed`
2. Updates `src/static/blog-feed.xml`
3. Validates the XML format
4. Shows feed size and confirmation

**Manual Alternative:**
```bash
node update-blog-feed.js
```

**Note:** After updating the feed, you need to rebuild and deploy the site for changes to appear in production:
```bash
npm run build
git add src/static/blog-feed.xml
git commit -m "Update blog feed"
git push
```

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

#### Projects
Edit `src/static/projects.json`:
```json
[
  {
    "title": "Project Name",
    "description": "Project description",
    "link": "https://project-url.com",
    "tags": ["tag1", "tag2"]
  }
]
```

#### Recommendations
Edit `src/static/nonFiction.json`:
```json
[
  {
    "title": "Book Title",
    "author": "Author Name",
    "link": "https://amazon.com/...",
    "description": "Why you should read this"
  }
]
```

#### Bucket List
Edit `src/static/bucketList.json`:
```json
[
  {
    "place": "Location Name",
    "country": "Country",
    "visited": false,
    "visitDate": null,
    "description": "Why I want to visit"
  }
]
```

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

### Updating Blog Content

1. Publish post on Substack
2. Run `npm run update-blog` locally
3. Verify changes: `npm start` and check `/blog`
4. Stage and commit: `git add src/static/blog-feed.xml && git commit -m "Update blog feed"`
5. Push to remote: `git push origin master`
6. Build and deploy: `netlify build && netlify deploy --prod`

### Making Style Changes

1. Edit `src/theme.js` for global theme changes
2. Use Chakra UI props for component-specific styles
3. Test across all pages
4. Check responsive behavior (mobile, tablet, desktop)

---

## Troubleshooting

### Blog Posts Not Showing

1. Check if feed file exists: `ls -lh src/static/blog-feed.xml`
2. Validate XML: `head -50 src/static/blog-feed.xml`
3. Check console for parsing errors
4. Verify Substack feed is accessible: `curl https://vivekkaushal.substack.com/feed`

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

## API Endpoints

### `/api/blog`
Serverless function that fetches fresh RSS feed from Substack.

- **Method:** GET
- **Response:** XML (application/xml)
- **Cache:** 10 minutes (s-maxage=600)
- **Timeout:** 5 seconds
- **Error Handling:** Returns 500 with error details on failure

**Usage in code:**
```javascript
fetch('/api/blog')
  .then(res => res.text())
  .then(xml => parseXML(xml))
```

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
# Update blog feed
npm run update-blog

# Check changes
git status

# Stage and commit
git add src/static/blog-feed.xml
git commit -m "Update blog feed with new post"

# Push to remote
git push origin master

# Build and deploy to production
netlify build
netlify deploy --prod
```

---

## Quick Reference

**Start Development:**
```bash
npm start
```

**Update Blog Feed:**
```bash
npm run update-blog
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
