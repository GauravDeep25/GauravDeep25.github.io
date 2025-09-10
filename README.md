# DevFolio - Personal Portfolio Website 🎨

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://GauravDeep25.github.io)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://github.com/GauravDeep25/GauravDeep25.github.io)

A modern, responsive portfolio website showcasing my skills, projects, and professional journey. Built with React and Vite, featuring a clean design with dark/light theme support and optimized for performance.

## 🌟 Live Website
**Visit:** [https://GauravDeep25.github.io](https://GauravDeep25.github.io)

## 🚀 Features

- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **🌓 Dark/Light Theme**: Seamless theme switching with smooth transitions
- **📧 Contact Form**: Integrated with Formspree for reliable message delivery
- **🏆 Certificate Gallery**: Interactive modal view for achievements and certifications
- **📈 Educational Timeline**: Visual representation of my learning journey
- **💼 Project Showcase**: Interactive project cards with live demos and source code links
- **⚡ Performance Optimized**: Built with Vite for lightning-fast loading
- **🎯 SEO Friendly**: Optimized meta tags and semantic HTML structure
- **♿ Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks and features
- **Vite** - Next-generation frontend build tool
- **CSS3** - Modern CSS with custom properties and animations
- **JavaScript (ES6+)** - Modern JavaScript features

### Services & Tools
- **Formspree** - Contact form backend service
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD pipeline for automated deployment
- **ESLint** - Code quality and consistency

## 📂 Project Structure

```
DevFolio/
├── public/
│   ├── Me.jpg              # Profile image
│   ├── Detectify.png       # Project screenshots
│   ├── GDSC.jpeg          # Certificate images
│   └── NSDC.jpeg
├── src/
│   ├── components/
│   │   ├── about.jsx       # About section
│   │   ├── contact.jsx     # Contact form
│   │   └── projects.jsx    # Projects showcase
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles and responsive design
│   └── main.jsx           # Application entry point
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions deployment
├── .env.example           # Environment variables template
└── package.json           # Dependencies and scripts
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/GauravDeep25/GauravDeep25.github.io.git
cd GauravDeep25.github.io
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual values
VITE_FORMSPREE_FORM_ID=your_formspree_form_id
VITE_CONTACT_EMAIL=your.email@example.com
# ... add other variables
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio in development mode.

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FORMSPREE_FORM_ID` | Formspree form endpoint | `https://formspree.io/f/xyzabc123` |
| `VITE_CONTACT_EMAIL` | Your contact email | `contact@example.com` |
| `VITE_CONTACT_PHONE` | Your phone number | `+1234567890` |
| `VITE_GITHUB_URL` | GitHub profile URL | `https://github.com/username` |
| `VITE_LINKEDIN_URL` | LinkedIn profile URL | `https://linkedin.com/in/username` |
| `VITE_INSTAGRAM_URL` | Instagram profile URL | `https://instagram.com/username` |

## 📱 Responsive Design Breakpoints

- **Mobile**: 320px - 480px
- **Tablet Portrait**: 481px - 768px
- **Tablet Landscape**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Desktop**: 1441px+

## 🎨 Design Features

### Color Scheme
- **Light Theme**: Clean whites and subtle grays
- **Dark Theme**: Deep blacks with cyan accents
- **Accent Color**: Modern blue (#3366ff) / Cyan (#64ffda)

### Typography
- **Font Family**: Inter (fallback to system fonts)
- **Responsive Text**: Clamp functions for optimal scaling
- **Visual Hierarchy**: Clear font weights and sizes

### Animations
- **Smooth Transitions**: 0.3s ease for theme switching
- **Morphing Blob**: 8s infinite animation on hero image
- **Hover Effects**: Subtle transform and shadow changes

## 🚀 Deployment

This portfolio is automatically deployed to GitHub Pages using GitHub Actions.

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### GitHub Actions (Automatic)
Every push to the `main` branch triggers automatic deployment via GitHub Actions.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: < 2 seconds on 3G
- **Bundle Size**: Optimized with Vite's tree shaking
- **Image Optimization**: WebP format with fallbacks

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add some improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Gaurav Deep**
- **Website**: [https://GauravDeep25.github.io](https://GauravDeep25.github.io)
- **Email**: gauravdeepgd12007@gmail.com
- **LinkedIn**: [linkedin.com/in/gauravdeep25](https://linkedin.com/in/gauravdeep25)
- **GitHub**: [github.com/GauravDeep25](https://github.com/GauravDeep25)

---

⭐ **Star this repository if you found it helpful!**

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌍 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FORMSPREE_FORM_ID=your_formspree_form_id
VITE_CONTACT_EMAIL=your.email@example.com
VITE_CONTACT_PHONE=+1234567890
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://linkedin.com/in/yourusername
VITE_INSTAGRAM_URL=https://instagram.com/yourusername
```

## 📁 Project Structure

```
src/
├── components/
│   ├── about.jsx          # About section with timeline and certificates
│   ├── about.css          # About section styles
│   ├── contact.jsx        # Contact form with Formspree integration
│   ├── contact.css        # Contact section styles
│   ├── projects.jsx       # Projects showcase
│   └── projects.css       # Projects section styles
├── App.jsx               # Main app component with navigation and theme
├── App.css              # Global styles and theme variables
├── main.jsx             # React app entry point
└── index.css            # Base styles and resets
```

## 🎨 Customization

### Adding Your Projects
Edit `src/components/projects.jsx` and update the `projectData` array with your project information.

### Updating Personal Information
- Edit `src/components/about.jsx` for education and skills
- Update certificate images in the `public/` folder
- Modify contact information via environment variables

### Theme Customization
All theme colors are defined in CSS custom properties in `src/App.css`. You can easily customize the color scheme by modifying the CSS variables.

## 📧 Contact Form Setup

This portfolio uses Formspree for contact form handling:

1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form and get your form ID
3. Add the form ID to your `.env` file as `VITE_FORMSPREE_FORM_ID`

## 🚀 Deployment

The project can be deployed to any static hosting service:

- **Vercel**: `npm run build` and deploy the `dist` folder
- **Netlify**: Connect your GitHub repository and set build command to `npm run build`
- **GitHub Pages**: Use GitHub Actions to build and deploy

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔒 Security Features

- Environment variables for sensitive data
- Sanitized contact form inputs
- HTTPS-only external links
- Secure headers and CSP-friendly code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gaurav Deep**
- GitHub: [@GauravDeep25](https://github.com/GauravDeep25)
- LinkedIn: [gauravdeep25](https://linkedin.com/in/gauravdeep25)

---

⭐ Star this repository if you found it helpful!
