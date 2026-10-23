import { profile, seeking } from "../data.js";
import { MailIcon, LinkedInIcon, GitHubIcon } from "./icons.jsx";

export default function Contact() {
  return (
    <section id="contacto" className="section">
      <div className="container">
        <div className="contact" data-reveal>
          <p className="section-label">
            <span>06</span> Contacto
          </p>
          <h2>¿Buscas a alguien que cuide la calidad de tu producto?</h2>
          <p className="contact-text">
            Estoy abierta a oportunidades como <strong>{seeking}</strong>. Escríbeme y conversamos.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <MailIcon /> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
