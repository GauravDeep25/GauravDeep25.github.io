export default function Skills() {
  const skills = [
    { name: "React.js", icon: "⚛️", color: "text-cyan-500", effect: "hover:animate-spin" },
    { name: "JavaScript", icon: "⚡", color: "text-yellow-400", effect: "hover:animate-wiggle" },
    { name: "Tailwind CSS", icon: "🌊", color: "text-teal-500", effect: "hover:scale-110" },
    { name: "Git & GitHub", icon: "🐙", color: "text-orange-600", effect: "hover:rotate-[-10deg]" },
    { name: "Vercel", icon: "📐", color: "text-black dark:text-white", effect: "hover:scale-90" },
    { name: "OSINT", icon: "🔍", color: "text-indigo-500", effect: "hover:scale-125" },
    { name: "Digital Forensics", icon: "🕵️‍♂️", color: "text-slate-500", effect: "hover:opacity-80" },
    { name: "Linux", icon: "🐧", color: "text-slate-900 dark:text-white", effect: "hover:bounce" },
    { name: "Networking", icon: "🌐", color: "text-blue-500", effect: "hover:animate-pulse" },
    { name: "Network Security", icon: "🛡️", color: "text-red-500", effect: "hover:shake" },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
            Magic Spells 🪄
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            These are the tools and technologies I use to breathe life into digital ideas and build scalable solutions.
          </p>
        </div>

        {/* Bubble Cloud Container */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`
                group px-6 py-3 bg-white dark:bg-slate-800 
                text-slate-800 dark:text-slate-200 
                rounded-full shadow-md hover:shadow-xl 
                hover:bg-teal-50 dark:hover:bg-teal-900/30 
                border border-slate-100 dark:border-slate-700 
                font-medium text-lg cursor-default 
                transition-all duration-300 
                hover:-translate-y-2 hover:rotate-2
              `}
            >
              <span className={`mr-2 inline-block transition-transform duration-500 ${skill.effect} ${skill.color}`}>
                {skill.icon}
              </span>
              {skill.name}
            </div>
          ))}
        </div>

        {/* Playful Handwritten Note */}
        <p className="font-hand text-2xl text-cyan-500 mt-12 rotate-[-1deg] animate-pulse">
          Always learning new tricks! ✨
        </p>
      </div>
    </section>
  );
}