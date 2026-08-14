import Hero from '../components/ui/Hero';
import About from '../components/ui/About';
import Skills from '../components/ui/Skills';
import Projects from '../components/ui/Projects';
import Contact from '../components/ui/Contact';

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="work">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}