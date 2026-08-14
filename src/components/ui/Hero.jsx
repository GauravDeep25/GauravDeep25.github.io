import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="..."
    >
    <section id="hero" className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        
        <div className="flex-1 text-center md:text-left relative">
          <div className="absolute -top-10 left-0 md:-left-8 text-3xl font-hand text-cyan-500 dark:text-cyan-400 -rotate-12 animate-float hidden sm:block">
            Hello! 👋
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 dark:text-white leading-tight mb-4">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-cyan-500 inline-block hover:animate-wiggle cursor-default">Gaurav Deep</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6 font-heading">
            I build <span className="relative inline-block">
              <span className="relative z-10">secure and scalable</span>
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-300 dark:text-primary-700/50 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/>
              </svg>
            </span> digital solutions with code and creativity
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto md:mx-0">
            A passionate Software Engineer specialising in Cybersecurity and a part-time Full-stack developer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center">
            <a href="#work" className="group relative px-8 py-3 font-semibold text-white bg-primary-500 rounded-full hover:bg-primary-600 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(20,184,166,0.3)]">
              View Projects 🚀
            </a>
            <a href="mailto:contact@gdeep.in" className="font-hand text-2xl text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rotate-2 hover:rotate-0">
              let's collaborate! ☕
            </a>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-cyan-300 rounded-full filter blur-2xl opacity-40 animate-pulse"></div>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-morph overflow-hidden shadow-2xl border-4 border-white/50 dark:border-slate-800/50 backdrop-blur-sm z-10 group bg-primary-500">
            {/* Replace with your actual photo or leave as placeholder */}
            <img 
              src="https://github.com/GauravDeep25.png" 
              alt="Gaurav Deep" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 text-5xl animate-bounce [animation-duration:3s]">⚡</div>
          <div className="absolute top-10 -right-4 text-4xl animate-bounce [animation-duration:2.5s] [animation-delay:0.5s]">💻</div>
        </div>
      </div>
    </section>
    </motion.section>
  );
}