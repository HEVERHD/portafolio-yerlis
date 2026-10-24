import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Process from "./components/Process.jsx";
import AutomationDemo from "./components/AutomationDemo.jsx";
import Projects from "./components/Projects.jsx";
import BugGame from "./components/BugGame.jsx";
import Quality from "./components/Quality.jsx";
import Timeline from "./components/Timeline.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import BugHunt from "./components/BugHunt.jsx";
import Console from "./components/Console.jsx";
import Boot from "./components/Boot.jsx";
import useReveal from "./useReveal.js";
import useSpotlight from "./useSpotlight.js";
import { useLang } from "./i18n.jsx";

export default function App() {
  const { t, lang } = useLang();
  useReveal(lang);
  useSpotlight();

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.ui.skip}
      </a>
      <Boot />
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Skills />
        <Process />
        <AutomationDemo />
        <Projects />
        <BugGame />
        <Quality />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <BugHunt />
      <Console />
    </>
  );
}
