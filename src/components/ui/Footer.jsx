import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/GauravDeep25',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      hoverClass: "hover:text-primary-500 hover:rotate-6"
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/gauravdeep25',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      hoverClass: "hover:text-blue-600 hover:-rotate-6"
    }
  ];

  return (
    <footer className="relative z-10 py-12 mt-20 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* Social Bubbles */}
        <div className="flex justify-center space-x-4 mb-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`p-3 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.hoverClass}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Branding & Copyright */}
        <div className="text-center">
          <p className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
            Gaurav Deep <span className="text-primary-500">✨</span>
          </p>
          <p className="font-medium text-slate-500 dark:text-slate-400 text-sm">
            Crafted with ☕ and <span className="text-red-500 animate-pulse inline-block">❤️</span> &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}