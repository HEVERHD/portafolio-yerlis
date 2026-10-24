import { profile } from "../content.js";
import { useLang } from "../i18n.jsx";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons.jsx";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.role} ·{" "}
          <a href="#calidad" className="footer-qa">
            {t.ui.footer}
          </a>
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
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
