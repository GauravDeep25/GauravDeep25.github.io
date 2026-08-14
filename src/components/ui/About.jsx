export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white">My Story 🕵️‍♂️</h2>
          <p className="font-hand text-2xl text-primary-500 mt-2 rotate-2">The engineer behind the code</p>
        </div>
        
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-xl border border-white/50 dark:border-slate-700/50 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-200/80 dark:bg-amber-500/50 rotate-[-2deg] backdrop-blur-sm shadow-sm z-10"></div>
          
          <div className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed space-y-6">
            <p className="text-xl">
              I'm <span className="font-bold text-primary-600 dark:text-primary-400">Gaurav Deep</span>, a Full Stack Developer and Cybersecurity enthusiast based in India.
            </p>
            <p>
              I'm a cybersecurity-focused Computer Science student with a strong interest in network security, ethical hacking, and secure systems. I enjoy breaking down how systems work, finding vulnerabilities, and building tools that make software safer. My work spans cybersecurity, CTFs, security research, and development, with a growing focus on network defense and security engineering.

            </p>
            <p>
                I love building scalable web applications using the MERN stack, with a deep focus on performance and clean architecture. My journey is driven by a curiosity to understand how things work under the hood and a passion for solving real-world problems.
            </p>
            <p>
              Currently pursuing Computer Science Engineering with a focus on IoT, Blockchain, and Security.
            </p>
            <p className="font-hand text-2xl text-slate-500 pt-4">
              When I'm not coding, you'll find me exploring new technologies or Cybresecurity skills. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}