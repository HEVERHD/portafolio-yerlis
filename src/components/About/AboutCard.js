import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            ¡Hola! Soy <span className="purple">Yerlis Dimas</span>, QA Engineer con experiencia en{" "}
            <b className="purple">pruebas manuales y automatizadas</b>.
            <br />
            <br />
            🐞 Apasionada por la detección de defectos críticos y la mejora continua de los procesos de calidad.
            <br />
            <br />
            🧪 Tengo experiencia en <b className="purple">pruebas funcionales, de regresión y API testing</b> con Postman,
            además de validación de aplicaciones móviles con Android Studio.
            <br />
            <br />
            ⚙️ También he trabajado en automatización de pruebas con{" "}
            <b className="purple">Python + Selenium WebDriver</b> y actualmente sigo reforzando mis habilidades en{" "}
            <b className="purple">automatización y análisis de datos</b>.
            <br />
            <br />
            Aparte del testing, disfruto de actividades que me inspiran a seguir aprendiendo:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Aprender nuevas herramientas de QA y automatización
            </li>
            <li className="about-activity">
              <ImPointRight /> Analizar datos y métricas de calidad
            </li>
            <li className="about-activity">
              <ImPointRight /> Escuchar música y pasar tiempo en familia
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            “La calidad no es un acto, es un hábito.”{" "}
          </p>
          <footer className="blockquote-footer">Yerlis Dimas</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
