import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Process from "./components/Process.jsx";
import Projects from "./components/Projects.jsx";
import Timeline from "./components/Timeline.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import BugHunt from "./components/BugHunt.jsx";
import Console from "./components/Console.jsx";
import useReveal from "./useReveal.js";
import useSpotlight from "./useSpotlight.js";

export default function App() {
  useReveal();
  useSpotlight();

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Skills />
        <Process />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <BugHunt />
      <Console />
    </>
  );
}
