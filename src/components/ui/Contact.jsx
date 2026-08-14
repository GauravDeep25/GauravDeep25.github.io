export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="font-hand text-3xl text-amber-500 mb-4 -rotate-3">What's Next?</div>
        <h2 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-6">
          Let's grab a virtual coffee ☕
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          My inbox is always open! Whether you have a project idea, a security question, 
          or just want to talk about Linux and OSINT, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a 
            href="mailto:contact@gdeep.in" 
            className="inline-block px-10 py-4 font-heading font-bold text-lg text-white bg-slate-900 dark:bg-primary-500 rounded-full hover:-translate-y-2 shadow-[0_10px_0_0_rgba(20,184,166,1)] hover:shadow-[0_5px_0_0_rgba(20,184,166,1)] hover:translate-y-1 transition-all active:shadow-none active:translate-y-2"
          >
            Say Hello 👋
          </a>
          
          <a 
            href="https://linkedin.com/in/gaurav-deep" 
            target="_blank" 
            rel="noreferrer"
            className="font-hand text-2xl text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors"
          >
            or find me on LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}