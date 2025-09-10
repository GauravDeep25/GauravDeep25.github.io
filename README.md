# DevFolio - Personal Portfolio Website

A modern, responsive portfolio website built with React and Vite, featuring a clean design with dark/light theme support and optimized for performance.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Contact Form**: Integrated with Formspree for contact form submissions
- **Certificate Modal**: Interactive certificate gallery with modal view
- **Timeline Section**: Educational journey with responsive timeline
- **Project Showcase**: Clean project cards with live demo and GitHub links
- **Performance Optimized**: Built with Vite for fast development and production builds

## 🛠️ Technologies Used

- **Frontend**: React 19, JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: CSS3 with custom properties (CSS variables)
- **Form Handling**: Formspree
- **Code Quality**: ESLint with React hooks and refresh plugins

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/GauravDeep25/DevFolio.git
   cd DevFolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file and add your configuration values:
   - Formspree form ID
   - Contact information
   - Social media links
   - Project URLs

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
