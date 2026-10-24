import { profile } from "../content.js";
import { useLang } from "../i18n.jsx";
import { MailIcon, LinkedInIcon, GitHubIcon } from "./icons.jsx";

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;

  return (
    <section id="contacto" className="section">
      <div className="container">
        <div className="contact" data-reveal>
          <p className="section-label">
            <span>09</span> {c.label}
          </p>
          <h2>{c.title}</h2>
          <p className="contact-text">
            {c.textBefore} <strong>{c.seeking}</strong>
            {c.textAfter}
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
