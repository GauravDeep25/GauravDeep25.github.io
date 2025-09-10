# Deployment Checklist

## Pre-Deployment Security & Environment Setup

### 1. Environment Variables
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all required environment variables:
  - [ ] `VITE_FORMSPREE_FORM_ID` - Your Formspree form ID
  - [ ] `VITE_CONTACT_EMAIL` - Your contact email
  - [ ] `VITE_CONTACT_PHONE` - Your phone number
  - [ ] `VITE_GITHUB_URL` - Your GitHub profile URL
  - [ ] `VITE_LINKEDIN_URL` - Your LinkedIn profile URL
  - [ ] `VITE_INSTAGRAM_URL` - Your Instagram profile URL
  - [ ] `VITE_DETECTIFY_LIVE_URL` - Your project live URL
  - [ ] `VITE_DETECTIFY_GITHUB_URL` - Your project GitHub URL

### 2. Content Updates
- [ ] Update personal information in `src/components/about.jsx`
- [ ] Add your project details in `src/components/projects.jsx`
- [ ] Replace certificate images in `public/` folder
- [ ] Update profile image (`public/Me.png`)
- [ ] Verify all image paths are correct

### 3. Formspree Setup
- [ ] Create account on Formspree.io
- [ ] Create a new form
- [ ] Copy form ID to environment variables
- [ ] Test contact form functionality

### 4. Code Quality
- [ ] Run `npm run lint` and fix any issues
- [ ] Test all functionality in development
- [ ] Verify responsive design on different screen sizes
- [ ] Test dark/light theme toggle
- [ ] Verify all links work correctly

### 5. Security
- [ ] Ensure `.env` is in `.gitignore`
- [ ] No sensitive data hardcoded in source files
- [ ] All external links use HTTPS
- [ ] Contact form has proper validation

### 6. Build & Test
- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Verify all environment variables work in production

### 7. Deployment Platform Setup

#### For Vercel:
- [ ] Connect GitHub repository
- [ ] Set environment variables in Vercel dashboard
- [ ] Configure build settings (should auto-detect)

#### For Netlify:
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Add environment variables in site settings

#### For GitHub Pages:
- [ ] Set up GitHub Actions workflow
- [ ] Configure repository secrets for environment variables
- [ ] Enable GitHub Pages in repository settings

### 8. Post-Deployment
- [ ] Test deployed site functionality
- [ ] Verify contact form works on live site
- [ ] Check all links and images load correctly
- [ ] Test on mobile devices
- [ ] Verify SEO meta tags are working
- [ ] Submit to Google Search Console (optional)

### 9. Maintenance
- [ ] Set up automated dependency updates
- [ ] Monitor for security vulnerabilities
- [ ] Regular backups of environment configuration
- [ ] Keep portfolio content updated

## Environment Variables Template

```env
# Copy to .env and fill in your values
VITE_FORMSPREE_FORM_ID=your_formspree_id_here
VITE_CONTACT_EMAIL=your.email@example.com
VITE_CONTACT_PHONE=+1234567890
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://linkedin.com/in/yourusername
VITE_INSTAGRAM_URL=https://instagram.com/yourusername
VITE_DETECTIFY_LIVE_URL=https://your-project.com
VITE_DETECTIFY_GITHUB_URL=https://github.com/yourusername/project
```

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```
