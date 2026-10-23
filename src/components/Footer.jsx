import { profile } from "../data.js";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
        <ul className="footer-links">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} aria-label="Correo electrónico">
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
